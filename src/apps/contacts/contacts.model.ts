import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import type { Contact } from "./use-contacts";

export function getContacts(
  clientId: string,
  connectionId: string,
  callback: (contacts: Contact[]) => void
): () => void {
  const colRef = collection(db, "clients", clientId, "connections", connectionId, "contacts");
  const constactsQuery = query(colRef, orderBy("createdAt", "desc"));

  const unsubscribe = onSnapshot(constactsQuery, (snapshot) => {
    const data: Contact[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Contact[];
    callback(data);
  });

  return unsubscribe;
}

export async function addContact(
  clientId: string,
  connectionId: string,
  name: string,
  phone: string
) {
  const colRef = collection(db, "clients", clientId, "connections", connectionId, "contacts");
  return await addDoc(colRef, {
    name,
    phone,
    createdAt: new Date(),
  });
}

export async function updateContact(
  clientId: string,
  connectionId: string,
  contactId: string,
  data: Partial<Contact>
) {
  const docRef = doc(db, "clients", clientId, "connections", connectionId, "contacts", contactId);
  await updateDoc(docRef, data);
}

export async function deleteContact(clientId: string, connectionId: string, contactId: string) {
  const docRef = doc(db, "clients", clientId, "connections", connectionId, "contacts", contactId);
  await deleteDoc(docRef);
}
