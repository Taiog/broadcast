import { AlertDialog } from "../../../components/dialog/alert-dialog";
import { openDialog } from "../../../components/dialog/dialog-facade";
import type { Contact } from "../../contacts/contacts.model";
import type { Message } from "../messages.model";
import { MessagesDialog } from "./messages-dialog";

export function openMessagesDialog(mode: "create" | "edit", connectionId: string, clientId: string, contats: Contact[], initialData?: Message | null) {
    openDialog({
        fullWidth: true,
        maxWidth: 'xs',
        children: <MessagesDialog contacts={contats} mode={mode} initialData={initialData} connectionId={connectionId} clientId={clientId} />,
    });
}

export function openMessagesAlertDialog(onClick: () => Promise<void>) {
    openDialog({
        fullWidth: true,
        maxWidth: 'xs',
        children: <AlertDialog title="Deletar mensagem" description="Tem certeza que deseja deletar essa mensagem?" buttonText="Deletar" onClick={onClick} />,
    });
}