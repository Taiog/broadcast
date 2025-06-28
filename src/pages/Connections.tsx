import { useAuth } from "../hooks/useAuth";
import { ConnectionList } from "../components/list/ConnectionList";

export function ConnectionsPage() {
    const { user } = useAuth();

    if (!user) return <div>Loading...</div>;

    return <ConnectionList clientId={user.uid} />;
}