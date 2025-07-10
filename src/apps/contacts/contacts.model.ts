import { addDoc, updateDoc, deleteDoc, query, where, orderBy } from "firebase/firestore";
import { collection, doc } from "../../core/services/firestore";
import { collectionData } from "rxfire/firestore";
import { shareReplay } from "rxjs";

export interface Contact {
  id?: string;
  name: string;
  phone: string;
  connectionId: string;
  clientId: string;
  createdAt?: Date;
}

const colRef = collection<Contact>("contacts");

export function getContacts$(clientId: string, connectionId: string) {
  return collectionData(
    query(
      colRef,
      where("connectionId", "==", connectionId),
      where("clientId", "==", clientId),
      orderBy("createdAt", "desc")
    ),
    { idField: "id" }
  ).pipe(shareReplay({ refCount: false, bufferSize: 1 }));
}

export async function addContact(contact: Contact) {
  return await addDoc(colRef, {
    ...contact,
    createdAt: new Date(),
  });
}

export async function updateContact(contactId: string, data: Partial<Contact>) {
  await updateDoc(doc<Contact>(colRef, contactId), data);
}

export async function deleteContact(contactId: string) {
  await deleteDoc(doc<Contact>(colRef, contactId));
}
