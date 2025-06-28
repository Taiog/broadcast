import { type PropsWithChildren } from "react";
import { Grid } from "@mui/material";
import { Header } from "../screen/Header";
import Screen from "../screen/Screen";



export function AuthenticatedLayout({ children }: PropsWithChildren) {
    return (
        <Screen className="h-dvh flex-col">
            <Header />
            <Grid container flex={1} height="100%" width={"100%"}>
                {children}
            </Grid>
        </Screen>
    );
}
