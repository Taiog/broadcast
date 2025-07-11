import { AlertDialog } from "../../../components/dialog/alert-dialog";
import { openDialog } from "../../../components/dialog/dialog-facade";
import type { Connection } from "../connections.model";
import { ConnectionsDialog } from "./connections-dialog";

export function openConnectionsDialog(mode: "create" | "edit", clientId: string, initialData?: Connection) {
    openDialog({
        fullWidth: true,
        maxWidth: 'xs',
        children: <ConnectionsDialog mode={mode} initialData={initialData} clientId={clientId} />,
    });
}

export function openConnectionsAlertDialog(onClick: () => Promise<void>) {
    openDialog({
        fullWidth: true,
        maxWidth: 'xs',
        children: <AlertDialog title="Deletar conexão" description="Tem certeza que deseja deletar essa conexão?" buttonText="Deletar" onClick={onClick} />,
    });
}