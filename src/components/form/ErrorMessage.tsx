import { Typography } from "@mui/material";

interface ErrorMessageProps {
    message: string | null;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
    if (!message) return null;

    return (
        <Typography variant="body2" className="text-red-600 text-center">
            {message}
        </Typography>
    );
};

export default ErrorMessage;
