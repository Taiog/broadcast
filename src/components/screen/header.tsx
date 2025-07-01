import { AppBar, Toolbar, Typography } from "@mui/material";

import LogoutButton from "../logout-button";
import { useAuth } from "../../hooks/use-auth";

function Header() {
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

export default Header