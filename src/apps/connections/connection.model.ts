import { db } from "../../services/firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const CONNECTIONS_COLLECTION = "connections";

export interface Connection {
  id?: string;
  name: string;
  createdAt?: Date;
}

export function getConnections(
  clientId: string,
  callback: (contacts: Connection[]) => void
): () => void {
  const colRef = collection(db, "clients", clientId, CONNECTIONS_COLLECTION);
  const connectionQuery = query(colRef, orderBy("createdAt", "desc"));

  const unsubscribe = onSnapshot(connectionQuery, (snapshot) => {
    const data: Connection[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Connection[];
    callback(data);
  });

  return unsubscribe;
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
