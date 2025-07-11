import { useState } from "react";
import { useContacts } from "../../contacts/use-contacts";
import { useMessages } from "../use-messages";
import Typography from "@mui/material/Typography";
import { Column } from "../../../components/screen/column";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import { TableHeader } from "../../../components/table/table-header";
import Add from "@mui/icons-material/Add";
import { MessagesTableRow } from "./messages-table-row";
import { openMessagesDialog } from "./messages-facade";

interface MessagesTableProps {
    clientId: string;
    connectionId: string;
}

export function MessagesTable(props: MessagesTableProps) {
    const { clientId, connectionId } = props

    const [filter, setFilter] = useState<"all" | "agendada" | "enviada">("all");

    const { state: contacts } = useContacts(clientId, connectionId);

    const { state: messages, error, loading } = useMessages(clientId, connectionId, filter)

    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Column title="Mensagens">
            {loading ? <CircularProgress sx={{ mt: 2, alignSelf: 'center', width: '100%' }} /> : <Box p={2}>
                <Paper>
                    <TableHeader
                        buttonIcon={<Add />}
                        buttonText="Nova mensagem"
                        handleOpenCreate={() => openMessagesDialog('create', connectionId, clientId, contacts)}
                        rightComponent={
                            <ToggleButtonGroup
                                value={filter}
                                exclusive
                                onChange={(_, newFilter) => {
                                    if (newFilter !== null) setFilter(newFilter);
                                }}
                                size="small"
                            >
                                <ToggleButton value="all">Todas</ToggleButton>
                                <ToggleButton value="agendada">Agendadas</ToggleButton>
                                <ToggleButton value="enviada">Enviadas</ToggleButton>
                            </ToggleButtonGroup>
                        } />
                    {messages.length === 0 ? (
                        <Typography p={2} color="black" align="center">Nenhuma mensagem encontrada.</Typography>
                    ) : (
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Texto</TableCell>
                                    <TableCell>Destinatários</TableCell>
                                    <TableCell>Agendada para</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell align="right">Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {messages.map((msg) => (
                                    <MessagesTableRow key={msg.id} contacts={contacts} message={msg} />
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </Paper>
            </Box>}
        </Column>
    );
}

