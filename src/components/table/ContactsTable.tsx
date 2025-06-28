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
} from "@mui/material";
import { useContacts } from "../../hooks/contacts/useGetContacts";
import Column from "../screen/Column";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useState } from "react";
import type { Contact } from "../../types/types";
import { addContact, deleteContact, updateContact } from "../../services/contactService";
import { ContactFormPopover } from "../form/ContactFormPopover";
import { formatPhone } from "../../utils/formatPhone";

interface Props {
    clientId: string;
    connectionId: string;
}

export function ContactsTable({ clientId, connectionId }: Props) {
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
        console.log(contact)
        setEditContact(contact);
        setMode("edit");
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setEditContact(null);
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
                                    <TableCell>{contact.name}</TableCell>
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
