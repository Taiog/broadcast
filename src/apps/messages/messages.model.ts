import { addDoc, updateDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { collection, doc } from "../../core/services/firestore";

export interface Message {
  id?: string;
  text: string;
  scheduledAt: Date;
  status: "agendada" | "enviada";
  contactIds: string[];
  connectionId: string;
  clientId: string;
  createdAt?: Date;
}

export async function createMessage(message: Message) {
  const ref = collection<Message>("messages");

  await addDoc(ref, {
    ...message,
    scheduledAt: Timestamp.fromDate(new Date(message.scheduledAt)),
    createdAt: Timestamp.now(),
  });
}

export async function updateMessage(messageId: string, data: Partial<Message>) {
  const ref = doc<Message>("messages", messageId);

  await updateDoc(ref, {
    ...data,
    ...(data.scheduledAt && { scheduledAt: Timestamp.fromDate(new Date(data.scheduledAt)) }),
  });
}

export async function deleteMessage(messageId: string) {
  const ref = doc<Message>("messages", messageId);

  await deleteDoc(ref);
}
