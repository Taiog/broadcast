import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface ConnectionsListInputProps {
    value: string;
    onChange: (value: string) => void;
    onAdd: () => void;
};

export function ConnectionsListInput(props: ConnectionsListInputProps) {
    const { onAdd, onChange, value } = props

    return (
        <Box display="flex" m={2} gap={"10px"}>
            <TextField
                label="Nova Conexão"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                fullWidth
            />
            <Button variant="contained" onClick={onAdd} disabled={!value.trim()}>
                Adicionar
            </Button>
        </Box>
    );
}
