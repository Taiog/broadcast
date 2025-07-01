import { Typography } from "@mui/material";

interface ErrorMessageProps {
    message: string | null;
}

function ErrorMessage(props: ErrorMessageProps) {
    const { message } = props
    if (!message) return null;

    return (
        <Typography variant="body2" className="text-red-600 text-center">
            {message}
        </Typography>
    );
};

export default ErrorMessage;
