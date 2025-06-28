import { useState } from "react";
import { IconButton, InputAdornment, FormControl, InputLabel, FormHelperText, OutlinedInput, type OutlinedInputProps } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { type FieldError } from "react-hook-form";

interface PasswordInputProps extends Omit<OutlinedInputProps, "error"> {
    label?: string;
    error?: FieldError;
}

function PasswordInput({ label = "Senha", error, ...props }: PasswordInputProps) {
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
                {...props}
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

export default PasswordInput;
