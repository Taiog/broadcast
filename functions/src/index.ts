import { setGlobalOptions } from "firebase-functions";
import { updateScheduledMessages } from "./schedule/update-scheduled-messages";
import { onUserCreate } from "./triggers/on-user-create";
setGlobalOptions({ maxInstances: 3 });

export { onUserCreate };

export { updateScheduledMessages };
