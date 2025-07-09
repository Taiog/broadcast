import { useQueryData } from "../../core/hooks/use-query-data";
import { type Message } from "./messages.model";
import { orderBy, Timestamp, where } from "firebase/firestore";

interface RawMessage extends Omit<Message, "scheduledAt" | "createdAt"> {
  scheduledAt: Timestamp;
  createdAt: Timestamp;
}

export function useMessages(
  connectionId: string,
  clientId: string,
  filter: "all" | "agendada" | "enviada" = "all"
) {
  const messagesQuery = [
    where("connectionId", "==", connectionId),
    where("clientId", "==", clientId),
    orderBy("createdAt", "desc"),
  ];

  if (filter !== "all") {
    messagesQuery.push(where("status", "==", filter));
  }

  const { state, loading, error } = useQueryData<RawMessage>(
    `messages`,
    [connectionId, filter],
    messagesQuery
  );

  const messages = state.map((message) => ({
    ...message,
    scheduledAt: message.scheduledAt?.toDate(),
    createdAt: message.createdAt?.toDate(),
  }));

  return { messages, loading, error };
}
