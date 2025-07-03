import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { type FieldError } from "react-hook-form";
import OutlinedInput, { type OutlinedInputProps } from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormHelperText from "@mui/material/FormHelperText";

interface PasswordInputProps extends Omit<OutlinedInputProps, "error"> {
    label?: string;
    error?: FieldError;
}

export function PasswordInput(props: PasswordInputProps) {
    const { label, error, ...rest } = props

    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password" error={!!error}>{label}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                label={label}
                type={showPassword ? "text" : "password"}
                aria-describedby="outlined-error-helper-text"
                fullWidth
                error={!!error}
                {...rest}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
            <FormHelperText id="outlined-error-helper-text" error={!!error}>{error?.message}</FormHelperText>
        </FormControl>
    );
}