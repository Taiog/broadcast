import { db } from "../../services/firebase";
import { collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";

export interface Connection {
  id?: string;
  name: string;
  createdAt?: Date;
}

export async function addConnection(clientId: string, name: string) {
  const colRef = collection(db, "clients", clientId, "connections");

  return await addDoc(colRef, {
    name,
    createdAt: new Date(),
  });
}

export async function updateConnection(
  clientId: string,
  connectionId: string,
  data: Partial<Connection>
) {
  const docRef = doc(db, "clients", clientId, "connections", connectionId);

  await updateDoc(docRef, data);
}

export async function deleteConnection(clientId: string, connectionId: string) {
  const docRef = doc(db, "clients", clientId, "connections", connectionId);

  await deleteDoc(docRef);
}
