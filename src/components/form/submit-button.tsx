import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

interface SubmitButtonProps {
    loading: boolean;
    text: string;
}

export function SubmitButton(props: SubmitButtonProps) {
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