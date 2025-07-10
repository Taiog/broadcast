import { collectionData } from "rxfire/firestore";
import { collection, doc } from "../../core/services/firestore";
import { addDoc, updateDoc, deleteDoc, where, orderBy, query } from "firebase/firestore";
import { shareReplay } from "rxjs";

export interface Connection {
  id?: string;
  clientId: string;
  name: string;
  createdAt?: Date;
}

const colRef = collection<Connection>("connections");

export function getClientConnections$(clientId: string) {
  return collectionData(
    query(colRef, where("clientId", "==", clientId), orderBy("createdAt", "desc")),
    { idField: "id" }
  ).pipe(shareReplay({ refCount: false, bufferSize: 1 }));
}

export async function addConnection(clientId: string, name: string) {
  return await addDoc(colRef, {
    name,
    clientId,
    createdAt: new Date(),
  });
}

export async function updateConnection(connectionId: string, data: Partial<Connection>) {
  await updateDoc(doc<Connection>(colRef, connectionId), data);
}

export async function deleteConnection(connectionId: string) {
  await deleteDoc(doc<Connection>(colRef, connectionId));
}
