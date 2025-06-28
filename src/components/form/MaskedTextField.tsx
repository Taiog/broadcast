import { TextField, type TextFieldProps } from "@mui/material";
import { IMaskMixin } from "react-imask";

export const MaskedTextField = IMaskMixin(
    ({ inputRef, ...props }) => (
        <TextField
            {...(props as TextFieldProps)}
            inputRef={inputRef}
            fullWidth
            margin="dense"
            size="small"
        />
    )
);