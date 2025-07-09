import { collection, doc } from "../../core/services/firestore";
import { addDoc, updateDoc, deleteDoc } from "firebase/firestore";

export interface Connection {
  id?: string;
  clientId: string;
  name: string;
  createdAt?: Date;
}

export async function addConnection(clientId: string, name: string) {
  const colRef = collection<Connection>("connections");

  return await addDoc(colRef, {
    name,
    clientId,
    createdAt: new Date(),
  });
}

export async function updateConnection(connectionId: string, data: Partial<Connection>) {
  const docRef = doc<Connection>("connections", connectionId);

  await updateDoc(docRef, data);
}

export async function deleteConnection(connectionId: string) {
  const docRef = doc<Connection>("connections", connectionId);

  await deleteDoc(docRef);
}
