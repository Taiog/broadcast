import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import type { Contact } from '../../contacts/contacts.model'

interface MessagesFormProps {
    control: Control<{
        text: string;
        contactIds: string[];
        scheduledAt: Date;
        status?: "agendada" | "enviada" | undefined;
    }>
    errors: FieldErrors<{
        text: string;
        contactIds: string[];
        scheduledAt: Date;
        status?: "agendada" | "enviada";
    }>
    contacts: Contact[]
}

export function MessagesForm(props: MessagesFormProps) {
    const { contacts, control, errors } = props

    return (
        <Box display="flex" flexDirection="column" minWidth={300}>

            <Controller
                name="text"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Mensagem"
                        multiline
                        minRows={3}
                        maxRows={10}
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
                            disablePast={true}
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
        </Box>

    )
}
