import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageSchema, type MessageFormData } from "../schemas/messages-schema";
import { useEffect } from "react";
import { createMessage, updateMessage, type Message } from "../messages.model";
import { MessagesForm } from "./messages-form";
import type { Contact } from "../../contacts/contacts.model";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useCloseDialog } from "../../../components/dialog/dialog-app";
import { removeSecondsFromDate } from "../../../core/utils/remove-seconds-from-date";
import Box from "@mui/material/Box";

interface MessagesDialogProps {
    contacts: Contact[];
    mode?: "create" | "edit";
    initialData?: Message | null;
    connectionId: string
    clientId: string
}

export function MessagesDialog(props: MessagesDialogProps) {
    const { contacts, initialData, mode, clientId, connectionId } = props

    const onClose = useCloseDialog()

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<MessageFormData>({
        resolver: zodResolver(messageSchema),
        defaultValues: {
            text: initialData?.text || "",
            status: initialData?.status || 'agendada',
            contactIds: initialData?.contactIds || [],
            scheduledAt: initialData?.scheduledAt || new Date(),
        },
    });

    useEffect(() => {
        reset({
            text: initialData?.text || "",
            contactIds: initialData?.contactIds || [],
            scheduledAt: initialData?.scheduledAt || new Date(),
        });
    }, [initialData, reset]);

    const handleClose = () => {
        onClose();
        reset()
    };

    const executeSubmit = async (data: MessageFormData) => {
        if (initialData?.id) {
            await updateMessage(initialData.id, {
                ...data,
                scheduledAt: removeSecondsFromDate(data.scheduledAt),
            });
        } else {
            await createMessage({
                ...data,
                connectionId,
                clientId,
                scheduledAt: removeSecondsFromDate(data.scheduledAt),
                status: data.status || 'agendada'
            });
        }
    };

    const handleFormSubmit = (data: MessageFormData) => {
        executeSubmit({ ...data, status: 'agendada' });
        handleClose();
    };

    const handleSendNow = handleSubmit((data) => {
        executeSubmit({
            ...data,
            scheduledAt: new Date(),
            status: 'enviada'
        });
        handleClose();
    });

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
            <DialogTitle>
                {mode === "create" ? "Nova mensagem" : "Editar mensagem"}
            </DialogTitle>
            <DialogContent>
                <MessagesForm contacts={contacts} control={control} errors={errors} />
            </DialogContent>
            <DialogActions className="flex-col gap-3">
                <Box display={'flex'} flexDirection={'column'} width={'100%'} paddingX={'16px'} gap={1}>
                    <Button type="submit" variant="contained" fullWidth loading={isSubmitting}>
                        {mode === "create" ? "Agendar" : "Salvar"}
                    </Button>
                    {mode === "create" && (
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={handleSendNow}
                            loading={isSubmitting}
                        >
                            Enviar agora
                        </Button>
                    )}
                    <Button variant='outlined' color={'error'} type='button' fullWidth onClick={onClose}>Cancelar</Button>
                </Box>
            </DialogActions>
        </form>
    );
}
