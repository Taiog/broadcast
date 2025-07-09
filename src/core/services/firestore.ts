import {
  getFirestore,
  collection as fbCollection,
  doc as fbDoc,
  CollectionReference,
  DocumentReference,
} from "firebase/firestore";
import { app } from "./firebase";

export const db = getFirestore(app);

export function collection<T>(base: string, ...pathSegments: string[]): CollectionReference<T> {
  return fbCollection(db, base, ...pathSegments) as CollectionReference<T>;
}

export function doc<T>(path: string, ...pathSegments: string[]): DocumentReference<T> {
  return fbDoc(db, path, ...pathSegments) as DocumentReference<T>;
}
