import { type PropsWithChildren } from "react";
import { Grid } from "@mui/material";
import Header from "../screen/header";
import Screen from "../screen/screen";

function AuthenticatedLayout(props: PropsWithChildren) {
    const { children } = props
    return (
        <Screen className="h-dvh flex-col">
            <Header />
            <Grid container flex={1} height="100%" width={"100%"}>
                {children}
            </Grid>
        </Screen>
    );
}

export default AuthenticatedLayout