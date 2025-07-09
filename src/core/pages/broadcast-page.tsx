import { useState } from "react";
import { useAuth } from "../../apps/auth/hooks/use-auth";
import { AuthenticatedLayout } from "../../components/layout/authenticated-layout";
import { ConnectionsList } from "../../apps/connections/components/connections-list";
import { MenuList } from "../../components/list/menu-list";
import { MessagesTable } from "../../apps/messages/components/messages-table";
import { ContactsTable } from "../../apps/contacts/components/contacts-table";
import Grid from "@mui/material/Grid";

export function BroadcastPage() {
    const { user } = useAuth();

    const [selectedConnectionId, setSelectedConnectionId] = useState<string | null>(null);

    const [selectedOption, setSelectedOption] = useState<"contacts" | "messages">("contacts");

    if (!user) return null;

    return (
        <AuthenticatedLayout>
            <Grid container size={4} borderRight="1px solid #ccc">
                <ConnectionsList
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