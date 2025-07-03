import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import type { Contact } from "../../contacts/use-contacts";
import type { Message } from "../messages.model";
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";

interface MessagesTableRowProps {
    message: Message
    contacts: Contact[]
    handleOpenEdit: (message: Message, event: React.MouseEvent<HTMLElement>) => void
    handleDelete: (id: string) => Promise<void>
}
export function MessagesTableRow(props: MessagesTableRowProps) {
    const { message, contacts, handleDelete, handleOpenEdit } = props

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
                {message.status === 'agendada' && <IconButton size="small" onClick={(e) => handleOpenEdit(message, e)}>
                    <Edit />
                </IconButton>}
                <IconButton size="small" onClick={() => handleDelete(message.id)}>
                    <Delete />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}
