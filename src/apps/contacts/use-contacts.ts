import { orderBy, where } from "firebase/firestore";
import type { Contact } from "./contacts.model";
import { useQueryData } from "../../core/hooks/use-query-data";
import { useAuth } from "../auth/hooks/use-auth";

export function useContacts(connectionId: string) {
  const { user } = useAuth();

  const {
    state: contacts,
    loading,
    error,
  } = useQueryData<Contact>(
    `contacts`,
    [connectionId],
    [
      where("connectionId", "==", connectionId),
      where("clientId", "==", user?.uid),
      orderBy("createdAt", "desc"),
    ]
  );

  return { contacts, loading, error };
}
