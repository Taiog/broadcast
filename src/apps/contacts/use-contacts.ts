import { useEffect, useState } from "react";
import { collectionData } from "rxfire/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../../services/firebase";
import { map, type Subscription } from "rxjs";

export interface Contact {
  id?: string;
  name: string;
  phone: string;
  createdAt?: Date;
}

export function useContacts(clientId: string, connectionId: string | null) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!clientId || !connectionId) return;

    setLoading(true);
    setError(null);

    const ref = collection(db, "clients", clientId, "connections", connectionId, "contacts");

    const contactsQuery = query(ref, orderBy("createdAt", "desc"));

    const sub: Subscription = collectionData(contactsQuery, { idField: "id" })
      .pipe(map((docs) => docs as Contact[]))
      .subscribe({
        next: (data) => {
          setContacts(data);
          setLoading(false);
        },
        error: (err) => {
          console.error(err);
          setError("Erro ao carregar contatos");
          setLoading(false);
        },
      });

    return () => sub.unsubscribe();
  }, [clientId, connectionId]);

  return { contacts, loading, error };
}
