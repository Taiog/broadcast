import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import type { Connection } from "../types/types";

const CONNECTIONS_COLLECTION = "connections";

export async function getConnections(clientId: string): Promise<Connection[]> {
  const colRef = collection(db, "clients", clientId, CONNECTIONS_COLLECTION);
  const q = query(colRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Connection),
  }));
}

export async function addConnection(clientId: string, name: string) {
  const colRef = collection(db, "clients", clientId, CONNECTIONS_COLLECTION);
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
  const docRef = doc(db, "clients", clientId, CONNECTIONS_COLLECTION, connectionId);
  await updateDoc(docRef, data);
}

export async function deleteConnection(clientId: string, connectionId: string) {
  const docRef = doc(db, "clients", clientId, CONNECTIONS_COLLECTION, connectionId);
  await deleteDoc(docRef);
}
