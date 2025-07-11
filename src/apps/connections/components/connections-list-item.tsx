import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import { openConnectionsAlertDialog, openConnectionsDialog } from "./connections-facade";
import { deleteConnection, type Connection } from "../connections.model";

interface ConnectionsListItemProps {
    connection: Connection
    selected: boolean;
    onSelect: (id: string | null) => void;
};

export function ConnectionsListItem(props: ConnectionsListItemProps) {
    const { connection, onSelect, selected } = props

    return (
        <ListItem
            sx={{ paddingRight: "16px" }}
            secondaryAction={
                <>
                    <IconButton onClick={() => openConnectionsDialog('edit', connection.clientId, connection)}>
                        <Edit />
                    </IconButton>
                    <IconButton onClick={() => {
                        openConnectionsAlertDialog(() => deleteConnection(connection.id!))
                        onSelect(null)
                    }}>
                        <Delete />
                    </IconButton>
                </>
            }
        >
            <ListItemButton selected={selected} sx={{ paddingRight: "80px" }} onClick={() => onSelect(connection.id!)}>
                <Tooltip title={connection.name}>
                    <ListItemText
                        primary={
                            <span className="block max-w-[250px] truncate text-gray-800">
                                {connection.name}
                            </span>
                        }
                    />
                </Tooltip>
            </ListItemButton>
        </ListItem>
    );
}
