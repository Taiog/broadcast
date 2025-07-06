import { collection, addDoc, updateDoc, deleteDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "../../services/firebase";

export interface Message {
  id: string;
  text: string;
  scheduledAt: Date;
  status: "agendada" | "enviada";
  contactIds: string[];
  createdAt: Date;
}

export async function createMessage(
  clientId: string,
  connectionId: string,
  message: Omit<Message, "id" | "createdAt">
) {
  const ref = collection(db, "clients", clientId, "connections", connectionId, "messages");

  await addDoc(ref, {
    ...message,
    scheduledAt: Timestamp.fromDate(new Date(message.scheduledAt)),
    createdAt: Timestamp.now(),
  });
}

export async function updateMessage(
  clientId: string,
  connectionId: string,
  messageId: string,
  data: Partial<Omit<Message, "id" | "createdAt">>
) {
  const ref = doc(db, "clients", clientId, "connections", connectionId, "messages", messageId);

  await updateDoc(ref, {
    ...data,
    ...(data.scheduledAt && { scheduledAt: Timestamp.fromDate(new Date(data.scheduledAt)) }),
  });
}

export async function deleteMessage(clientId: string, connectionId: string, messageId: string) {
  const ref = doc(db, "clients", clientId, "connections", connectionId, "messages", messageId);

  await deleteDoc(ref);
}
