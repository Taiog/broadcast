import { Button } from "@mui/material";
import { useLogout } from "../hooks/useLogout";

function LogoutButton() {
    const { logout, loading } = useLogout();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <Button
            variant="outlined"
            color="error"
            onClick={handleLogout}
            disabled={loading}
            className="mt-4"
        >
            {"Sair"}
        </Button>
    );
}

export default LogoutButton;
