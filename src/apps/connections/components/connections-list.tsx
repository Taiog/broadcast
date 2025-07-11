import { Column } from "../../../components/screen/column";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import CircularProgress from "@mui/material/CircularProgress";
import { ConnectionsListItem } from "./connections-list-item";
import { useConnections } from "../use-connections";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import { openConnectionsDialog } from "./connections-facade";

interface ConnectionsListProps {
    clientId: string;
    onSelect: (id: string | null) => void;
    selectedConnectionId: string | null;
}

export function ConnectionsList(props: ConnectionsListProps) {
    const { onSelect, clientId, selectedConnectionId } = props
    const { state: connections, loading, error } = useConnections(clientId);

    if (error) return <Box color="error.main">{error}</Box>;

    return (
        <Column title="Selecione uma conexão">
            <Box >
                <Button variant="text" onClick={() => openConnectionsDialog('create', clientId)}>
                    <Add />
                    Adicionar conexão
                </Button>
            </Box>
            {loading ? <CircularProgress /> : <List disablePadding>
                {connections.map((connection) => (
                    <ConnectionsListItem
                        key={connection.id}
                        connection={connection}
                        selected={connection.id === selectedConnectionId}
                        onSelect={onSelect}
                    />
                ))}
            </List>}
        </Column>
    );
}

