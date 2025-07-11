import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { contactSchema, type ContactFormData } from "../schemas/contacts-schema";
import { ContactsForm } from "./contacts-form";
import { addContact, updateContact, type Contact } from "../contacts.model";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useCloseDialog } from "../../../components/dialog/dialog-app";
import DialogTitle from "@mui/material/DialogTitle";

interface ContactsDialogProps {
    mode?: "create" | "edit";
    initialData?: Contact | null;
    connectionId: string
    clientId: string
}

export function ContactsDialog(props: ContactsDialogProps) {
    const { initialData, mode, connectionId, clientId } = props

    const onClose = useCloseDialog()

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: initialData?.name || "",
            phone: initialData?.phone || "",
        },
    });

    useEffect(() => {
        reset({
            name: initialData?.name || "",
            phone: initialData?.phone || "",
        });
    }, [initialData, reset]);

    const handleClose = () => {
        onClose();
        reset();
    };

    const handleFormSubmit = async (data: ContactFormData) => {
        data.phone = data.phone.replace(/\D/g, "").replace(/^55/, "")

        if (mode === "create") {
            await addContact({ ...data, connectionId, clientId });
        } else if (initialData?.id) {
            await updateContact(initialData.id, data);
        }

        handleClose();
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <DialogTitle>
                {mode === "create" ? "Novo contato" : "Editar contato"}
            </DialogTitle>
            <DialogContent>
                <ContactsForm control={control} errors={errors} />
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' color={'error'} type='button' fullWidth onClick={onClose}>Cancelar</Button>
                <Button
                    variant="contained"
                    type="submit"
                    loading={isSubmitting}
                    fullWidth
                >
                    {mode === "create" ? "Adicionar" : "Salvar"}
                </Button>
            </DialogActions>
        </form>
    );
}

