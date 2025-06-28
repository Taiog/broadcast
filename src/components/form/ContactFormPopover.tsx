import {
    Box,
    Button,
    Popover,
    TextField,
    Typography,
} from "@mui/material";
import { type Contact } from "../../types/types";
import { Controller, useForm } from "react-hook-form";
import { contactSchema, type ContactFormData } from "../../schemas/contactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { matchIsValidTel, MuiTelInput } from 'mui-tel-input'

interface Props {
    anchorEl: HTMLElement | null;
    onClose: () => void;
    onSubmit: (contactData: { name: string; phone: string }) => void;
    mode?: "create" | "edit";
    initialData?: Contact | null;
}

export function ContactFormPopover({
    anchorEl,
    onClose,
    onSubmit,
    mode = "create",
    initialData,
}: Props) {
    const open = Boolean(anchorEl);

    const {
        control,
        register,
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
        reset();
        onClose();
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
                    <TextField
                        label="Nome"
                        fullWidth
                        margin="dense"
                        size="small"
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <Controller
                        name="phone"
                        control={control}
                        rules={{ validate: (value) => matchIsValidTel(value, { onlyCountries: ['BR'] }) }}
                        render={({ field: { ref: fieldRef, value, ...fieldProps }, fieldState }) => (
                            <MuiTelInput
                                {...fieldProps}
                                value={value ?? ''}
                                inputRef={fieldRef}
                                onlyCountries={["BR"]}
                                defaultCountry="BR"
                                helperText={fieldState.invalid ? "Telefone inválido" : ""}
                                error={fieldState.invalid}
                            />
                        )}
                    />
                    <Box mt={2}>
                        <Button
                            variant="contained"
                            type="submit"
                            fullWidth
                        >
                            {mode === "create" ? "Adicionar" : "Salvar"}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Popover>
    );
}
