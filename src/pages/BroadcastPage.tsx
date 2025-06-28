import { useState } from "react";
import { Grid } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { AuthenticatedLayout } from "../components/layout/AuthenticatedLayout";
import { ConnectionList } from "../components/list/ConnectionList";
import { MenuList } from "../components/list/MenuList";
import { ContactsTable } from "../components/table/ContactsTable";
import { MessagesTable } from "../components/table/MessagesTable";

export function BroadcastPage() {
    const { user } = useAuth();
    const [selectedConnectionId, setSelectedConnectionId] = useState<string | null>(null);
    const [selectedOption, setSelectedOption] = useState<"contacts" | "messages">("contacts");

    if (!user) return null;

    return (
        <AuthenticatedLayout>
            <Grid container size={4} borderRight="1px solid #ccc">
                <ConnectionList
                    clientId={user.uid}
                    selectedConnectionId={selectedConnectionId}
                    onSelect={setSelectedConnectionId}
                />
            </Grid>

            <Grid container size={2} borderRight="1px solid #ccc">
                <MenuList selected={selectedOption} onSelect={setSelectedOption} />
            </Grid>

            <Grid container size={6}>
                {selectedConnectionId && (
                    selectedOption === "contacts" ? (
                        <ContactsTable clientId={user.uid} connectionId={selectedConnectionId} />
                    ) :
                        <MessagesTable clientId={user.uid} connectionId={selectedConnectionId} />
                )
                }
            </Grid>
        </AuthenticatedLayout>
    );
}
