import { useEffect, useState } from "react";
import { getContacts } from "./contacts.model";

export interface Contact {
  id?: string;
  name: string;
  phone: string;
  createdAt?: Date;
}

export function useContacts(clientId: string, connectionId: string | null) {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!connectionId) return;

    setLoading(true);
    setError(null);

    const unsubscribe = getContacts(clientId, connectionId, (data) => {
      setContacts(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [clientId, connectionId]);

  return { contacts, loading, error };
}
