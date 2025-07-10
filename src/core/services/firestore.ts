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

export function doc<T>(
  reference: CollectionReference<T> | DocumentReference<T> | string,
  path: string,
  ...pathSegments: string[]
): DocumentReference<T> {
  if (typeof reference === "string") {
    return fbDoc(db, reference, path, ...pathSegments) as DocumentReference<T>;
  } else if (reference.type === "collection") {
    return fbDoc(reference, path, ...pathSegments) as DocumentReference<T>;
  } else {
    return fbDoc(reference, path, ...pathSegments) as DocumentReference<T>;
  }
}
