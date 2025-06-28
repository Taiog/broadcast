import { onSchedule } from "firebase-functions/v2/scheduler";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { logger } from "firebase-functions";

export const updateScheduledMessages = onSchedule("every 1 minutes", async () => {
  const db = getFirestore();
  const now = Timestamp.now();

  logger.info("⏰ Buscando mensagens agendadas vencidas...");

  const snapshot = await db
    .collectionGroup("messages")
    .where("status", "==", "agendada")
    .where("scheduledAt", "<=", now)
    .get();

  logger.info(`📦 ${snapshot.size} mensagens encontradas para atualizar.`);

  const batch = db.batch();

  snapshot.forEach((doc) => {
    batch.update(doc.ref, { status: "enviada" });
    logger.info(`✅ Mensagem ${doc.id} marcada como enviada.`);
  });

  await batch.commit();
  logger.info("🎉 Atualização finalizada com sucesso.");
});
