import { useEffect, useState } from "react";
import { getMessages, type Message } from "./messages.model";

export function useMessages(
  clientId: string,
  connectionId: string | null,
  filter: "all" | "agendada" | "enviada"
) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!connectionId) return;

    setLoading(true);
    setError(null);

    const unsubscribe = getMessages(clientId, connectionId, filter, (data: Message[]) => {
      setMessages(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [clientId, connectionId, filter]);

  return { messages, loading, error };
}
