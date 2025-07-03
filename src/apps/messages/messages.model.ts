import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  Timestamp,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../services/firebase";

export interface Message {
  id: string;
  text: string;
  scheduledAt: Date;
  status: "agendada" | "enviada";
  contactIds: string[];
}

export function getMessages(
  clientId: string,
  connectionId: string,
  status: "enviada" | "agendada" | "all" = "all",
  callback: (messages: Message[]) => void
): () => void {
  const baseRef = collection(db, "clients", clientId, "connections", connectionId, "messages");

  let q;

  if (status === "all") {
    q = query(baseRef, orderBy("createdAt", "desc"));
  } else {
    q = query(baseRef, where("status", "==", status), orderBy("createdAt", "desc"));
  }

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const data: Message[] = snapshot.docs.map((doc) => {
      const message = doc.data();

      return {
        id: doc.id,
        text: message.text,
        contactIds: message.contactIds || [],
        scheduledAt: message.scheduledAt?.toDate(),
        status: message.status,
        createdAt: message.createdAt?.toDate(),
      };
    });

    callback(data);
  });

  return unsubscribe;
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
