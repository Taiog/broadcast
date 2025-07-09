import {
  getFirestore,
  collection as fbCollection,
  doc as fbDoc,
  CollectionReference,
  DocumentReference,
} from "firebase/firestore";
import { app } from "./firebase";

export const db = getFirestore(app);

export function collection<T>(
  base: DocumentReference | string,
  ...pathSegments: string[]
): CollectionReference<T> {
  if (typeof base === "string") {
    return fbCollection(db, base, ...pathSegments) as CollectionReference<T>;
  }

  return fbCollection(base, "", ...pathSegments) as CollectionReference<T>;
}

export function doc<T>(path: string, ...pathSegments: string[]): DocumentReference<T> {
  return fbDoc(db, path, ...pathSegments) as DocumentReference<T>;
}
