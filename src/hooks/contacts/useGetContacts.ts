import { useEffect, useState } from "react";
import * as contactService from "../../services/contactService";
import type { Contact } from "../../types/types";

export function useContacts(clientId: string, connectionId: string | null) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!connectionId) return;

    setLoading(true);
    setError(null);

    const unsubscribe = contactService.getContacts(clientId, connectionId, (data) => {
      setContacts(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [clientId, connectionId]);

  return { contacts, loading, error };
}
