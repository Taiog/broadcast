import Button from "@mui/material/Button";
import { useLogout } from "../apps/auth/hooks/use-logout";

export function LogoutButton() {
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

