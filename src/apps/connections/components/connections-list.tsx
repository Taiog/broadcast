import { useState } from "react";
import { useConnections } from "../use-connections";
import { addConnection, deleteConnection, updateConnection } from "../connections.model";
import { Column } from "../../../components/screen/column";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import CircularProgress from "@mui/material/CircularProgress";
import { ConnectionsListInput } from "./connections-list-input";
import { ConnectionsListItem } from "./connections-list-item";

interface ConnectionsListProps {
    clientId: string;
    onSelect: (id: string | null) => void;
    selectedConnectionId: string | null;
}

export function ConnectionsList(props: ConnectionsListProps) {
    const { clientId, onSelect, selectedConnectionId } = props

    const { connections, loading, error } = useConnections(clientId);

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
            <ConnectionsListInput
                value={newName}
                onChange={setNewName}
                onAdd={handleAdd}
            />
            {loading ? <CircularProgress /> : <List disablePadding>
                {connections.map(({ id, name }) => (
                    <ConnectionsListItem
                        key={id}
                        id={id!}
                        name={name}
                        selected={id === selectedConnectionId}
                        isEditing={id === editId}
                        editName={editName}
                        onSelect={onSelect}
                        onEditStart={handleEditStart}
                        onEditChange={setEditName}
                        onEditCancel={() => setEditId(null)}
                        onEditSave={handleEditSave}
                        onDelete={handleDelete}
                    />
                ))}
            </List>}
        </Column>
    );
}

