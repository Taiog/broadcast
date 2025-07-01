import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Typography,
    CircularProgress,
    Box,
    IconButton,
    Button,
    Tooltip,
} from "@mui/material";
import { useContacts, type Contact } from "../../apps/contacts/use-contacts";
import Column from "../screen/column-temp";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useState } from "react";
import { addContact, deleteContact, updateContact } from "../../apps/contacts/contact.model";
import { formatPhone } from "../../utils/format-phone";
import ContactFormPopover from "../form/contact-form-popover";

interface Props {
    clientId: string;
    connectionId: string;
}

function ContactsTable(props: Props) {
    const { clientId, connectionId } = props
    const { contacts, loading, error } = useContacts(clientId, connectionId);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [editContact, setEditContact] = useState<Contact | null>(null);
    const [mode, setMode] = useState<"create" | "edit">("create");

    if (error) return <Typography color="error">{error}</Typography>;

    const handleOpenCreate = (event: React.MouseEvent<HTMLButtonElement>) => {
        setEditContact(null);
        setMode("create");
        setAnchorEl(event.currentTarget);
    };

    const handleOpenEdit = (event: React.MouseEvent<HTMLButtonElement>, contact: Contact) => {
        setEditContact(contact);
        setMode("edit");
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSubmit = async (data: { name: string; phone: string }) => {
        if (mode === "create") {
            await addContact(clientId, connectionId, data.name, data.phone);
        } else if (editContact?.id) {
            await updateContact(clientId, connectionId, editContact.id, data);
        }
    };

    const handleDelete = async (id: string) => {
        await deleteContact(clientId, connectionId, id);
    };

    return (
        <Column title="Contatos">
            {loading ? <CircularProgress sx={{ mt: 2, alignSelf: 'center', width: '100%' }} /> : <Box p={2}>
                <Paper>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} padding={'6px'}>
                        <Button
                            variant="text"
                            size="small"
                            startIcon={<Add />}
                            onClick={handleOpenCreate}
                        >
                            Novo contato
                        </Button>
                    </Box>
                    {contacts.length === 0 ? <Typography p={2} color="black" align="center">Nenhum contato encontrado.</Typography> : <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>Telefone</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        {<TableBody>
                            {contacts.map((contact) => (
                                <TableRow key={contact.id}>
                                    <TableCell>
                                        <Tooltip title={contact.name}>
                                            <Typography
                                                noWrap
                                                sx={{
                                                    maxWidth: 200,
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                }}
                                            >
                                                {contact.name.length > 30 ? contact.name.slice(0, 30) + "..." : contact.name}
                                            </Typography>
                                        </Tooltip>
                                    </TableCell>
                                    <TableCell>{formatPhone(contact.phone)}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            size="small"
                                            onClick={(e) => handleOpenEdit(e, contact)}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => contact.id && handleDelete(contact.id)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>}
                    </Table>}
                </Paper>
            </Box>}
            <ContactFormPopover
                anchorEl={anchorEl}
                onClose={handleClose}
                onSubmit={handleSubmit}
                mode={mode}
                initialData={editContact}
            />
        </Column>
    );
}

export default ContactsTable