import { useState } from "react";
import {
    Box,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
    CircularProgress,
    ListItemButton,
    Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useGetConnections } from "../../apps/connections/use-connections";
import Column from "../screen/column-temp";
import { addConnection, deleteConnection, updateConnection } from "../../apps/connections/connection.model";

interface ConnectionListProps {
    clientId: string;
    onSelect: (id: string | null) => void;
    selectedConnectionId: string | null;
}

function ConnectionList(props: ConnectionListProps) {
    const { clientId, onSelect, selectedConnectionId } = props
    const { connections, loading, error } = useGetConnections(clientId);
    const [newName, setNewName] = useState("");
    const [editId, setEditId] = useState<string | null>(null);
    const [editName, setEditName] = useState("");

    const handleAdd = async () => {
        if (!newName.trim()) return;
        await addConnection(clientId, newName.trim());
        setNewName("");
    };

    const handleDelete = async (id: string) => {
        await deleteConnection(clientId, id);
        onSelect(null)
    };

    const handleEditStart = (id: string, name: string) => {
        setEditId(id);
        setEditName(name);
    };

    const handleEditSave = async () => {
        if (!editName.trim() || !editId) return;
        await updateConnection(clientId, editId, { name: editName.trim() });
        setEditId(null);
        setEditName("");
    };

    if (error) return <Box color="error.main">{error}</Box>;

    return (
        <Column title="Selecione uma conexão">
            <Box display="flex" m={2} gap={'10px'}>
                <TextField
                    label="Nova Conexão"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    fullWidth
                />
                <Button variant="contained" onClick={handleAdd} disabled={!newName.trim()}>
                    Adicionar
                </Button>
            </Box>

            {loading ? <CircularProgress /> : <List disablePadding>
                {connections.map(({ id, name }) => (
                    <ListItem key={id} sx={{ paddingRight: '16px' }} secondaryAction={
                        <>
                            {editId === id ? (
                                <>
                                    <Button onClick={handleEditSave}>Salvar</Button>
                                    <Button onClick={() => setEditId(null)}>Cancelar</Button>
                                </>
                            ) : (
                                <>
                                    <IconButton onClick={() => handleEditStart(id!, name)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(id!)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </>
                            )}
                        </>
                    }>
                        <ListItemButton
                            selected={id === selectedConnectionId}
                            sx={{ paddingRight: '80px' }}
                            onClick={() => onSelect(id ?? null)}
                        >
                            {editId === id ? (
                                <TextField
                                    value={editName}
                                    variant="standard"
                                    onChange={(e) => setEditName(e.target.value)}
                                    autoFocus
                                    slotProps={{
                                        htmlInput: { style: { padding: '4px' } },
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
                ))}
            </List>}
        </Column>
    );
}

export default ConnectionList
