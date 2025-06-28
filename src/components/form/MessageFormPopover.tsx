import {
    Box,
    Button,
    Popover,
    TextField,
    Typography,
    Autocomplete,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { type Contact } from "../../types/types";
import { type Message } from "../../types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import 'dayjs/locale/pt-BR';
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { messageSchema, type MessageFormData } from "../../schemas/messageSchema";
import { useEffect } from "react";

interface Props {
    anchorEl: HTMLElement | null;
    onClose: () => void;
    onSubmit: (data: MessageFormData) => void;
    contacts: Contact[];
    mode?: "create" | "edit";
    initialData?: Message | null;
}



export function MessageFormPopover({
    anchorEl,
    onClose,
    onSubmit,
    contacts,
    mode = "create",
    initialData,
}: Props) {
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
                    <Controller
                        name="text"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Mensagem"
                                multiline
                                minRows={3}
                                fullWidth
                                margin="dense"
                                error={!!errors.text}
                                helperText={errors.text?.message}
                            />
                        )}
                    />

                    <Controller
                        name="contactIds"
                        control={control}
                        render={({ field }) => (
                            <Autocomplete
                                multiple
                                options={contacts}
                                getOptionLabel={(option) => option.name}
                                value={contacts.filter((c) => field.value.includes(c.id!))}
                                onChange={(_, value) =>
                                    field.onChange(value.map((v) => v.id))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Destinatários"
                                        margin="dense"
                                        error={!!errors.contactIds}
                                        helperText={errors.contactIds?.message}
                                    />
                                )}
                            />
                        )}
                    />

                    <Controller
                        name="scheduledAt"
                        control={control}
                        render={({ field }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                                <DateTimePicker
                                    label="Agendar para"
                                    timeSteps={{ minutes: 1 }}
                                    value={dayjs(field.value)}
                                    onChange={(date) => field.onChange(date?.toDate())}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            margin: "dense",
                                            error: !!errors.scheduledAt,
                                            helperText: errors.scheduledAt?.message,
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                        )}
                    />

                    <Box mt={2} display={'flex'} gap={'6px'} flexDirection={'column'}>
                        <Button type="submit" variant="contained" fullWidth>
                            {mode === "create" ? "Agendar" : "Salvar"}
                        </Button>
                        {mode === "create" && (
                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={handleSendNow}
                            >
                                Enviar agora
                            </Button>
                        )}
                    </Box>
                </form>
            </Box>
        </Popover>
    );
}
