import { useEffect, useState } from "react";
import { type Message } from "./messages.model";
import { collection, orderBy, query, Timestamp, where } from "firebase/firestore";
import { db } from "../../services/firebase";
import { map, type Subscription } from "rxjs";
import { collectionData } from "rxfire/firestore";

interface RawMessage extends Omit<Message, "scheduledAt" | "createdAt"> {
  scheduledAt: Timestamp;
  createdAt: Timestamp;
}

export function useMessages(
  clientId: string,
  connectionId: string | null,
  filter: "all" | "agendada" | "enviada" = "all"
) {
  const [messages, setMessages] = useState<Message[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!connectionId) return;

    setLoading(true);
    setError(null);

    const ref = collection(db, "clients", clientId, "connections", connectionId, "messages");

    let messagesQuery;

    if (filter === "all") {
      messagesQuery = query(ref, orderBy("createdAt", "desc"));
    } else {
      messagesQuery = query(ref, where("status", "==", filter), orderBy("createdAt", "desc"));
    }

    const sub: Subscription = collectionData(messagesQuery, { idField: "id" })
      .pipe(map((docs) => docs as RawMessage[]))
      .subscribe({
        next: (data) => {
          const normalizedData = data.map((message) => ({
            ...message,
            scheduledAt: message.scheduledAt?.toDate(),
            createdAt: message.createdAt?.toDate(),
          }));
          setMessages(normalizedData);
          setLoading(false);
        },
        error: (err) => {
          console.error(err);
          setError("Erro ao carregar mensagens");
          setLoading(false);
        },
      });

    return () => sub.unsubscribe();
  }, [clientId, connectionId, filter]);

  return { messages, loading, error };
}
