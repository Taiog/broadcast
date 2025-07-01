import { onSchedule } from "firebase-functions/v2/scheduler";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

export const updateScheduledMessages = onSchedule("every 1 minutes", async () => {
  const db = getFirestore();
  const now = Timestamp.now();

  const snapshot = await db
    .collectionGroup("messages")
    .where("status", "==", "agendada")
    .where("scheduledAt", "<=", now)
    .get();

  const batch = db.batch();

  snapshot.forEach((doc) => {
    batch.update(doc.ref, { status: "enviada" });
  });

  await batch.commit();
});
