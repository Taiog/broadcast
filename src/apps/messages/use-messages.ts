import { useObservable } from "../../core/hooks/use-observable";
import { getMessages$, type Message } from "./messages.model";
import { Timestamp } from "firebase/firestore";

interface RawMessage extends Omit<Message, "scheduledAt" | "createdAt"> {
  scheduledAt: Timestamp;
  createdAt: Timestamp;
}

export function useMessages(clientId: string, connectionId: string, filter: string) {
  return useObservable<RawMessage, Message>(
    () => getMessages$(clientId, connectionId, filter),
    [connectionId, filter],
    (message) => ({
      ...message,
      scheduledAt: message.scheduledAt?.toDate(),
      createdAt: message.createdAt?.toDate(),
    })
  );
}
