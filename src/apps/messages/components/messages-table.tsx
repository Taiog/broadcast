import { useState } from "react";
import { useContacts } from "../../contacts/use-contacts";
import { useMessages } from "../use-messages";
import { createMessage, deleteMessage, updateMessage, type Message } from "../messages.model";
import Typography from "@mui/material/Typography";
import type { MessageFormData } from "../schemas/messages-schema";
import { removeSecondsFromDate } from "../../../core/utils/remove-seconds-from-date";
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
import { MessagesPopover } from "./messages-popover";
import { TableHeader } from "../../../components/table/table-header";
import Add from "@mui/icons-material/Add";
import { MessagesTableRow } from "./messages-table-row";

interface MessagesTableProps {
    clientId: string;
    connectionId: string;
}

export function MessagesTable(props: MessagesTableProps) {
    const { clientId, connectionId } = props

    const [filter, setFilter] = useState<"all" | "agendada" | "enviada">("all");

    const { contacts } = useContacts(clientId, connectionId);

    const { messages, error, loading } = useMessages(connectionId, clientId, filter)

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const [editData, setEditData] = useState<Message | null>(null);

    if (error) return <Typography color="error">{error}</Typography>;

    const handleOpenCreate = (event: React.MouseEvent<HTMLElement>) => {
        setEditData(null);
        setAnchorEl(event.currentTarget);
    };

    const handleOpenEdit = (message: Message, event: React.MouseEvent<HTMLElement>) => {
        setEditData(message);
        setAnchorEl(event.currentTarget);
    };

    const closePopover = () => {
        setAnchorEl(null);
    };

    const handleSubmit = async (data: MessageFormData) => {
        if (editData?.id) {
            await updateMessage(editData.id, {
                ...data,
                scheduledAt: removeSecondsFromDate(data.scheduledAt),
            });
        } else {
            await createMessage({
                ...data,
                connectionId,
                clientId,
                scheduledAt: removeSecondsFromDate(data.scheduledAt),
                status: data.status || 'agendada'
            });
        }
    };

    const handleDelete = async (id: string) => {
        await deleteMessage(id);
    };

    return (
        <Column title="Mensagens">
            {loading ? <CircularProgress sx={{ mt: 2, alignSelf: 'center', width: '100%' }} /> : <Box p={2}>
                <Paper>
                    <TableHeader
                        buttonIcon={<Add />}
                        buttonText="Nova mensagem"
                        handleOpenCreate={handleOpenCreate}
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
                                    <MessagesTableRow key={msg.id} contacts={contacts} handleDelete={handleDelete} handleOpenEdit={handleOpenEdit} message={msg} />
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </Paper>
                <MessagesPopover
                    anchorEl={anchorEl}
                    onClose={closePopover}
                    onSubmit={handleSubmit}
                    contacts={contacts}
                    mode={editData ? "edit" : "create"}
                    initialData={editData}
                />
            </Box>}
        </Column>
    );
}

