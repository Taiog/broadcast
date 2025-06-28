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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useGetConnections } from "../../hooks/connections/useGetConnections";
import * as connectionService from "../../services/connectionService";
import Screen from "../screen/Screen";

interface ConnectionListProps {
    clientId: string;
}

export function ConnectionList({ clientId }: ConnectionListProps) {
    const { connections, loading, error, fetchConnections } = useGetConnections(clientId);
    const [newName, setNewName] = useState("");
    const [editId, setEditId] = useState<string | null>(null);
    const [editName, setEditName] = useState("");

    const handleAdd = async () => {
        if (!newName.trim()) return;
        await connectionService.addConnection(clientId, newName.trim());
        setNewName("");
        fetchConnections();
    };

    const handleDelete = async (id: string) => {
        await connectionService.deleteConnection(clientId, id);
        fetchConnections();
    };

    const handleEditStart = (id: string, name: string) => {
        setEditId(id);
        setEditName(name);
    };

    const handleEditSave = async () => {
        if (!editName.trim() || !editId) return;
        await connectionService.updateConnection(clientId, editId, { name: editName.trim() });
        setEditId(null);
        setEditName("");
        fetchConnections();
    };

    if (error) return <Box color="error.main">{error}</Box>;

    return (
        <Screen>
            <Box width={'500px'}>
                <Box display="flex" mb={2}>
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

                {loading ? <CircularProgress /> : <List sx={{ bgcolor: 'HighlightText' }}>
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
                            {editId === id ? (
                                <TextField
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    fullWidth
                                    autoFocus
                                />
                            ) : (
                                <ListItemText primary={name} className="text-gray-800" />
                            )}
                        </ListItem>
                    ))}
                </List>}
            </Box>
        </Screen>
    );
}
