
import AppBar from "@mui/material/AppBar";
import { useAuth } from "../../apps/auth/hooks/use-auth";
import { LogoutButton } from "../logout-button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export function Header() {
    const { user } = useAuth()

    return (
        <AppBar position="static" color="primary">
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography variant="h6">Broadcast - {user?.email}</Typography>
                <LogoutButton />
            </Toolbar>
        </AppBar>
    );
}