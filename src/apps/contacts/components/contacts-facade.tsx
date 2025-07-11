import { AlertDialog } from "../../../components/dialog/alert-dialog";
import { openDialog } from "../../../components/dialog/dialog-facade";
import type { Contact } from "../contacts.model";
import { ContactsDialog } from "./contacts-dialog";

export function openContactsDialog(mode: "create" | "edit", connectionId: string, clientId: string, initialData?: Contact | null) {
    openDialog({
        fullWidth: true,
        maxWidth: 'xs',
        children: <ContactsDialog mode={mode} initialData={initialData} connectionId={connectionId} clientId={clientId} />,
    });
}

export function openContactsAlertDialog(onClick: () => Promise<void>) {
    openDialog({
        fullWidth: true,
        maxWidth: 'xs',
        children: <AlertDialog title="Deletar contato" description="Tem certeza que deseja deletar esse contato?" buttonText="Deletar" onClick={onClick} />,
    });
}