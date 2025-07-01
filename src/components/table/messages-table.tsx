import {
    Box,
    Button,
    CircularProgress,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    ToggleButton,
    ToggleButtonGroup,
    Tooltip,
    Typography,
} from "@mui/material";
import { useState } from "react";
import { deleteMessage, updateMessage, createMessage, type Message } from "../../apps/messages/message.model";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import type { MessageFormData } from "../../schemas/message-schema";
import { MessageFormPopover } from "../form/message-form-popover";
import { useContacts } from "../../apps/contacts/use-contacts";
import Column from "../screen/column";
import { useMessages } from "../../apps/messages/use-messages";
import { removeSecondsFromDate } from "../../utils/remove-seconds-from-date";

interface Props {
    clientId: string;
    connectionId: string;
}

function MessagesTable(props: Props) {
    const { clientId, connectionId } = props
    const [filter, setFilter] = useState<"all" | "agendada" | "enviada">("all");

    const { contacts } = useContacts(clientId, connectionId);
    const { messages, error, loading } = useMessages(clientId, connectionId, filter)

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [editData, setEditData] = useState<Message | null>(null);


    if (error) return <Typography color="error">{error}</Typography>;

    const openCreate = (event: React.MouseEvent<HTMLElement>) => {
        setEditData(null);
        setAnchorEl(event.currentTarget);
    };

    const openEdit = (message: Message, event: React.MouseEvent<HTMLElement>) => {
        setEditData(message);
        setAnchorEl(event.currentTarget);
    };

    const closePopover = () => {
        setAnchorEl(null);
    };

    const handleSubmit = async (data: MessageFormData) => {
        if (editData) {
            await updateMessage(clientId, connectionId, editData.id, {
                ...data,
                scheduledAt: removeSecondsFromDate(data.scheduledAt),
            });
        } else {
            await createMessage(clientId, connectionId, {
                ...data,
                scheduledAt: removeSecondsFromDate(data.scheduledAt),
                status: data.status || 'agendada'
            });
        }
    };

    const getContactNames = (ids: string[]) => {
        const selected = contacts.filter((c) => ids.includes(c.id!));
        const names = selected.map((c) => c.name);
        const first = names[0];
        const rest = names.slice(1);
        return { first, rest };
    };

    const handleDelete = async (id: string) => {
        await deleteMessage(clientId, connectionId, id);
    };

    return (
        <Column title="Mensagens">
            {loading ? <CircularProgress sx={{ mt: 2, alignSelf: 'center', width: '100%' }} /> : <Box p={2}>
                <Paper>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} padding={'6px'}>
                        <Button variant="text" size="small" startIcon={<AddIcon />} onClick={openCreate}>
                            Nova mensagem
                        </Button>
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
                    </Box>
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
                                {messages.map((msg) => {
                                    const { first, rest } = getContactNames(msg.contactIds);

                                    return (
                                        <TableRow key={msg.id}>
                                            <TableCell width={'40%'}>
                                                <Tooltip title={msg.text}>
                                                    <Typography
                                                        noWrap
                                                        sx={{
                                                            maxWidth: 200,
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis",
                                                            whiteSpace: "nowrap",
                                                        }}
                                                    >
                                                        {msg.text.length > 30 ? msg.text.slice(0, 30) + "..." : msg.text}
                                                    </Typography>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>
                                                {first}
                                                {rest.length > 0 && (
                                                    <Tooltip title={rest.join(", ")}>
                                                        <span style={{ cursor: "pointer" }}> +{rest.length}...</span>
                                                    </Tooltip>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {dayjs(msg.scheduledAt).format("DD/MM/YYYY HH:mm")}
                                            </TableCell>
                                            <TableCell>{msg.status}</TableCell>
                                            <TableCell align="right">
                                                {msg.status === 'agendada' && <IconButton size="small" onClick={(e) => openEdit(msg, e)}>
                                                    <EditIcon />
                                                </IconButton>}
                                                <IconButton size="small" onClick={() => handleDelete(msg.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    )}
                </Paper>
                <MessageFormPopover
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

export default MessagesTable
