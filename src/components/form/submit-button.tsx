import { Button, CircularProgress } from "@mui/material";

interface SubmitButtonProps {
    loading: boolean;
    text: string;
}

function SubmitButton(props: SubmitButtonProps) {
    const { loading, text } = props
    return (
        <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            className="rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
        >
            {loading ? <CircularProgress size={24} color="inherit" /> : text}
        </Button>
    );
};

export default SubmitButton;
