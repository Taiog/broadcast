import { Button } from "@mui/material";
import { useLogout } from "../hooks/use-logout";

function LogoutButton() {
    const { logout, loading } = useLogout();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <Button
            variant="text"
            color="inherit"
            onClick={handleLogout}
            disabled={loading}
            className="mt-4"
        >
            {"Logout"}
        </Button>
    );
}

export default LogoutButton;
