import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { formatPhone } from '../../../core/utils/format-phone'
import Edit from '@mui/icons-material/Edit'
import Delete from '@mui/icons-material/Delete'
import { deleteContact, type Contact } from '../contacts.model'
import { openContactsAlertDialog, openContactsDialog } from './contacts-facade'

interface ContactsTableRowProps {
    contact: Contact
}

export function ContactsTableRow(props: ContactsTableRowProps) {
    const { contact } = props

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
                    onClick={() => openContactsDialog('edit', contact.connectionId, contact.clientId, contact)}
                >
                    <Edit />
                </IconButton>
                <IconButton
                    size="small"
                    onClick={() => openContactsAlertDialog(() => deleteContact(contact.id!))}
                >
                    <Delete />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}
