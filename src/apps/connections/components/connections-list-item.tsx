import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";

interface ConnectionsListItemProps {
    id: string;
    name: string;
    selected: boolean;
    isEditing: boolean;
    editName: string;
    onSelect: (id: string | null) => void;
    onEditStart: (id: string, name: string) => void;
    onEditChange: (name: string) => void;
    onEditCancel: () => void;
    onEditSave: () => void;
    onDelete: (id: string) => void;
};

export function ConnectionsListItem(props: ConnectionsListItemProps) {
    const { editName, id, isEditing, name, onDelete, onEditCancel, onEditChange, onEditSave, onEditStart, onSelect, selected } = props

    return (
        <ListItem
            sx={{ paddingRight: "16px" }}
            secondaryAction={
                isEditing ? (
                    <>
                        <Button onClick={onEditSave}>Salvar</Button>
                        <Button onClick={onEditCancel}>Cancelar</Button>
                    </>
                ) : (
                    <>
                        <IconButton onClick={() => onEditStart(id, name)}>
                            <Edit />
                        </IconButton>
                        <IconButton onClick={() => onDelete(id)}>
                            <Delete />
                        </IconButton>
                    </>
                )
            }
        >
            <ListItemButton selected={selected} sx={{ paddingRight: "80px" }} onClick={() => onSelect(id)}>
                {isEditing ? (
                    <TextField
                        value={editName}
                        variant="standard"
                        onChange={(e) => onEditChange(e.target.value)}
                        autoFocus
                        slotProps={{
                            htmlInput: { style: { padding: "4px" } },
                            input: {
                                disableUnderline: true,
                            },
                        }}
                    />
                ) : (
                    <Tooltip title={name}>
                        <ListItemText
                            primary={
                                <span className="block max-w-[250px] truncate text-gray-800">
                                    {name}
                                </span>
                            }
                        />
                    </Tooltip>
                )}
            </ListItemButton>
        </ListItem>
    );
}
