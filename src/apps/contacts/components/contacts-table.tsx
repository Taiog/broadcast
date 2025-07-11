import { useContacts } from "../use-contacts";
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
import { TableHeader } from "../../../components/table/table-header";
import { ContactsTableRow } from "./contacts-table-row";
import Add from "@mui/icons-material/Add";
import { openContactsDialog } from "./contacts-facade";

interface ContactsTableProps {
    clientId: string;
    connectionId: string;
}

export function ContactsTable(props: ContactsTableProps) {
    const { clientId, connectionId } = props

    const { state: contacts, loading, error } = useContacts(clientId, connectionId);

    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Column title="Contatos">
            {loading ? <CircularProgress sx={{ mt: 2, alignSelf: 'center', width: '100%' }} /> : <Box p={2}>
                <Paper>
                    <TableHeader buttonIcon={<Add />} buttonText="Novo contato" handleOpenCreate={() => {
                        openContactsDialog('create', connectionId, clientId)
                    }} />
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
                                <ContactsTableRow key={contact.id} contact={contact} />
                            ))}
                        </TableBody>}
                    </Table>}
                </Paper>
            </Box>}
        </Column>
    );
}

