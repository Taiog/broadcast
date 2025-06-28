import { setGlobalOptions } from "firebase-functions";

setGlobalOptions({ maxInstances: 3 });

import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";

admin.initializeApp();

export const onUserCreate = functions.auth.user().onCreate(async (user) => {
  const db = admin.firestore();

  return db.collection("clients").doc(user.uid).set({
    email: user.email,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  });
});
