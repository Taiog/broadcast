import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { deleteMessage, type Message } from "../messages.model";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import type { Contact } from "../../contacts/contacts.model";
import { openMessagesAlertDialog, openMessagesDialog } from "./messages-facade";

interface MessagesTableRowProps {
    message: Message
    contacts: Contact[]
}
export function MessagesTableRow(props: MessagesTableRowProps) {
    const { message, contacts } = props

    const getContactNames = (ids: string[]) => {
        const selected = contacts.filter((contact) => ids.includes(contact.id!));

        const names = selected.map((contact) => contact.name);

        const first = names[0];

        const rest = names.slice(1);

        return { first, rest };
    };

    const { first, rest } = getContactNames(message.contactIds);

    return (
        <TableRow key={message.id}>
            <TableCell width={'40%'}>
                <Tooltip title={message.text}>
                    <Typography
                        noWrap
                        sx={{
                            maxWidth: 200,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {message.text.length > 30 ? message.text.slice(0, 30) + "..." : message.text}
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
                {dayjs(message.scheduledAt).format("DD/MM/YYYY HH:mm")}
            </TableCell>
            <TableCell>{message.status}</TableCell>
            <TableCell align="right">
                {message.status === 'agendada' && <IconButton size="small" onClick={() => openMessagesDialog('edit', message.connectionId, message.clientId, contacts, message)}>
                    <Edit />
                </IconButton>}
                <IconButton size="small" onClick={() => openMessagesAlertDialog(() => deleteMessage(message?.id!))}>
                    <Delete />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}
