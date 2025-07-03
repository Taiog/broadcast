import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput, { type OutlinedInputProps } from "@mui/material/OutlinedInput";
import { type FieldError } from "react-hook-form";

interface FormInputProps extends Omit<OutlinedInputProps, "error"> {
    label: string;
    type?: string;
    error?: FieldError;
}

export function FormInput(props: FormInputProps) {
    const { label, type, error, ...rest } = props

    return (
        <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-input" error={!!error}>{label}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-input"
                label={label}
                type={type}
                aria-describedby="outlined-error-helper-text"
                fullWidth
                error={!!error}
                {...rest}
            />
            <FormHelperText id="outlined-error-helper-text" error={!!error}>{error?.message}</FormHelperText>
        </FormControl>
    );
}