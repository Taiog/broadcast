import { addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { collection, doc } from "../../core/services/firestore";

export interface Contact {
  id?: string;
  name: string;
  phone: string;
  connectionId: string;
  clientId: string;
  createdAt?: Date;
}

export async function addContact(contact: Contact) {
  const colRef = collection<Contact>("contacts");

  return await addDoc(colRef, {
    ...contact,
    createdAt: new Date(),
  });
}

export async function updateContact(contactId: string, data: Partial<Contact>) {
  const docRef = doc<Contact>("contacts", contactId);

  await updateDoc(docRef, data);
}

export async function deleteContact(contactId: string) {
  const docRef = doc<Contact>("contacts", contactId);

  await deleteDoc(docRef);
}
