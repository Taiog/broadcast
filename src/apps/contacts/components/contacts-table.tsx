import { useContacts } from "../use-contacts";
import { useState } from "react";
import { addContact, deleteContact, updateContact, type Contact } from "../contacts.model";
import Typography from "@mui/material/Typography";
import { Column } from "../../../components/screen/column";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import { ContactsPopover } from "./contacts-popover";
import { TableHeader } from "../../../components/table/table-header";
import { ContactsTableRow } from "./contacts-table-row";
import Add from "@mui/icons-material/Add";

interface ContactsTableProps {
    clientId: string;
    connectionId: string;
}

export function ContactsTable(props: ContactsTableProps) {
    const { clientId, connectionId } = props

    const { contacts, loading, error } = useContacts(connectionId);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const [editContact, setEditContact] = useState<Contact | null>(null);

    const [mode, setMode] = useState<"create" | "edit">("create");

    if (error) return <Typography color="error">{error}</Typography>;

    const handleOpenCreate = (event: React.MouseEvent<HTMLElement>) => {
        setEditContact(null);
        setMode("create");
        setAnchorEl(event.currentTarget);
    };

    const handleOpenEdit = (event: React.MouseEvent<HTMLElement>, contact: Contact) => {
        setEditContact(contact);
        setMode("edit");
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSubmit = async (data: { name: string; phone: string }) => {
        if (mode === "create") {
            await addContact({ ...data, connectionId, clientId });
        } else if (editContact?.id) {
            await updateContact(editContact.id, data);
        }
    };

    const handleDelete = async (id: string) => {
        await deleteContact(id);
    };

    return (
        <Column title="Contatos">
            {loading ? <CircularProgress sx={{ mt: 2, alignSelf: 'center', width: '100%' }} /> : <Box p={2}>
                <Paper>
                    <TableHeader buttonIcon={<Add />} buttonText="Novo contato" handleOpenCreate={handleOpenCreate} />
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
                                <ContactsTableRow key={contact.id} contact={contact} handleDelete={handleDelete} handleOpenEdit={handleOpenEdit} />
                            ))}
                        </TableBody>}
                    </Table>}
                </Paper>
            </Box>}
            <ContactsPopover
                anchorEl={anchorEl}
                onClose={handleClose}
                onSubmit={handleSubmit}
                mode={mode}
                initialData={editContact}
            />
        </Column>
    );
}

