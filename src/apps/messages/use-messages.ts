import { useQueryData } from "../../core/hooks/use-query-data";
import { useAuth } from "../auth/hooks/use-auth";
import { type Message } from "./messages.model";
import { orderBy, Timestamp, where } from "firebase/firestore";

interface RawMessage extends Omit<Message, "scheduledAt" | "createdAt"> {
  scheduledAt: Timestamp;
  createdAt: Timestamp;
}

export function useMessages(connectionId: string, filter: "all" | "agendada" | "enviada" = "all") {
  const { user } = useAuth();

  const messagesQuery = [
    where("connectionId", "==", connectionId),
    where("clientId", "==", user?.uid),
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
