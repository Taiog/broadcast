import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { messageSchema, type MessageFormData } from "../schemas/messages-schema";
import { useEffect } from "react";
import type { Message } from "../messages.model";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { MessagesForm } from "./messages-form";
import type { Contact } from "../../contacts/contacts.model";

interface MessagesPopoverProps {
    anchorEl: HTMLElement | null;
    onClose: () => void;
    onSubmit: (data: MessageFormData) => void;
    contacts: Contact[];
    mode?: "create" | "edit";
    initialData?: Message | null;
}

export function MessagesPopover(props: MessagesPopoverProps) {
    const { anchorEl, contacts, onClose, onSubmit, initialData, mode } = props

    const open = Boolean(anchorEl);

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
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

    const handleFormSubmit = (data: MessageFormData) => {
        onSubmit({ ...data, status: 'agendada' });
        handleClose();
    };

    const handleSendNow = handleSubmit((data) => {
        onSubmit({
            ...data,
            scheduledAt: new Date(),
            status: 'enviada'
        });
        handleClose();
    });

    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
            <Box p={2} display="flex" flexDirection="column" minWidth={300}>
                <Typography variant="subtitle1" mb={1}>
                    {mode === "create" ? "Nova Mensagem" : "Editar Mensagem"}
                </Typography>

                <form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
                    <MessagesForm contacts={contacts} control={control} errors={errors} handleSendNow={handleSendNow} mode={mode} />
                </form>
            </Box>
        </Popover>
    );
}
