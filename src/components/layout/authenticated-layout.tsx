import { type PropsWithChildren } from "react";
import { Screen } from "../screen/screen";
import { Header } from "../screen/header";
import Grid from "@mui/material/Grid";

export function AuthenticatedLayout(props: PropsWithChildren) {
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