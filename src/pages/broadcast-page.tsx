import { useState } from "react";
import { Grid } from "@mui/material";
import { useAuth } from "../hooks/use-auth";
import AuthenticatedLayout from "../components/layout/authenticated-layout";
import ConnectionList from "../components/list/connection-list";
import ContactsTable from "../components/table/contacts-table";
import MessagesTable from "../components/table/messages-table";
import MenuList from "../components/list/menu-list";

function BroadcastPage() {
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

export default BroadcastPage