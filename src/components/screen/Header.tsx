import { AppBar, Toolbar, Typography } from "@mui/material";

import LogoutButton from "../LogoutButton";
import { useAuth } from "../../hooks/useAuth";

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
