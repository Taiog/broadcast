import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import type { Contact } from "../use-contacts";
import { contactSchema, type ContactFormData } from "../schemas/contacts-schema";
import Popover from "@mui/material/Popover";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ContactsForm } from "./contacts-form";

interface ContactsPopoverProps {
    anchorEl: HTMLElement | null;
    onClose: () => void;
    onSubmit: (contactData: { name: string; phone: string }) => void;
    mode?: "create" | "edit";
    initialData?: Contact | null;
}

export function ContactsPopover(props: ContactsPopoverProps) {
    const { anchorEl, onClose, onSubmit, initialData, mode } = props

    const open = Boolean(anchorEl);

    const {
        control,
        handleSubmit,
        formState: { errors },
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

    const handleFormSubmit = (data: ContactFormData) => {
        const rawPhone = data.phone.replace(/\D/g, "").replace(/^55/, "")

        onSubmit({ ...data, phone: rawPhone });

        handleClose();
    };

    return (
        <Popover
            id={"contact-popover"}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
            <Box p={2} display="flex" flexDirection="column" minWidth={250}>
                <Typography variant="subtitle1" mb={1}>
                    {mode === "create" ? "Novo Contato" : "Editar Contato"}
                </Typography>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <ContactsForm control={control} errors={errors} mode={mode} />
                </form>
            </Box>
        </Popover>
    );
}

