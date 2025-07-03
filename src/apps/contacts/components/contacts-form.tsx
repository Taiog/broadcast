import TextField from '@mui/material/TextField'
import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { MaskedTextField } from '../../../components/form/masked-text-field'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

interface ContactsFormProps {
    control: Control<{
        name: string;
        phone: string;
    }>
    errors: FieldErrors<{
        name: string;
        phone: string;
    }>
    mode?: "create" | "edit";
}

export function ContactsForm(props: ContactsFormProps) {
    const { control, errors, mode } = props

    return (
        <>
            <Controller name="name" control={control} render={({ field }) => (
                <TextField
                    {...field}
                    label="Nome"
                    fullWidth
                    margin="dense"
                    size="small"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />
            )} />

            <Controller
                name={'phone'}
                control={control}
                render={({ field }) => (
                    <MaskedTextField
                        {...field}
                        mask="(00) 0 0000-0000"
                        unmask={true}
                        onAccept={(value: string) => field.onChange(value)}
                        overwrite
                        label={"Telefone"}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
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
        </>
    )
}
