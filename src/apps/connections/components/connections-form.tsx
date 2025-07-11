import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { type Control, type FieldErrors, Controller } from "react-hook-form";

interface ConnectionsFormProps {
    control: Control<{
        name: string;
    }>
    errors: FieldErrors<{
        name: string;
    }>
}

export function ConnectionsForm(props: ConnectionsFormProps) {
    const { control, errors } = props

    return (
        <Box display="flex" flexDirection="column" minWidth={250}>
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
        </Box>
    )
}
