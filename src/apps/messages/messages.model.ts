import { addDoc, updateDoc, deleteDoc, Timestamp, query, where, orderBy } from "firebase/firestore";
import { collection, doc } from "../../core/services/firestore";
import { collectionData } from "rxfire/firestore";
import { shareReplay } from "rxjs";

export type MessageStatus = "agendada" | "enviada";

export interface Message {
  id?: string;
  text: string;
  scheduledAt: Date;
  status: MessageStatus;
  contactIds: string[];
  connectionId: string;
  clientId: string;
  createdAt?: Date;
}

const colRef = collection<Message>("messages");

export function getMessages$(clientId: string, connectionId: string, filter: string) {
  const messagesQuery = [
    where("connectionId", "==", connectionId),
    where("clientId", "==", clientId),
    orderBy("createdAt", "desc"),
  ];

  if (filter !== "all") {
    messagesQuery.push(where("status", "==", filter));
  }

  return collectionData(query(colRef, ...messagesQuery), { idField: "id" }).pipe(
    shareReplay({ refCount: false, bufferSize: 1 })
  );
}

export async function createMessage(message: Message) {
  await addDoc(colRef, {
    ...message,
    scheduledAt: Timestamp.fromDate(new Date(message.scheduledAt)),
    createdAt: Timestamp.now(),
  });
}

export async function updateMessage(messageId: string, data: Partial<Message>) {
  await updateDoc(doc<Message>(colRef, messageId), {
    ...data,
    ...(data.scheduledAt && { scheduledAt: Timestamp.fromDate(new Date(data.scheduledAt)) }),
  });
}

export async function deleteMessage(messageId: string) {
  await deleteDoc(doc<Message>(colRef, messageId));
}
