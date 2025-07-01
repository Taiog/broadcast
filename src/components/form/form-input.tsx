import { FormControl, FormHelperText, InputLabel, OutlinedInput, type OutlinedInputProps } from "@mui/material";
import { type FieldError } from "react-hook-form";

interface FormInputProps extends Omit<OutlinedInputProps, "error"> {
    label: string;
    type?: string;
    error?: FieldError;
}

function FormInput(props: FormInputProps) {
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

export default FormInput;