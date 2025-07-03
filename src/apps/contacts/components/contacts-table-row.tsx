import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { formatPhone } from '../../../utils/format-phone'
import type { Contact } from '../use-contacts'
import Edit from '@mui/icons-material/Edit'
import Delete from '@mui/icons-material/Delete'

interface ContactsTableRowProps {
    contact: Contact
    handleOpenEdit: (event: React.MouseEvent<HTMLButtonElement>, contact: Contact) => void
    handleDelete: (id: string) => Promise<void>
}

export function ContactsTableRow(props: ContactsTableRowProps) {
    const { contact, handleDelete, handleOpenEdit } = props

    return (
        <TableRow>
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
    )
}
