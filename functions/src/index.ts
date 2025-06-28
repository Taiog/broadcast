import { setGlobalOptions } from "firebase-functions";
import { updateScheduledMessages } from "./schedule/updateScheduledMessages";
import { onUserCreate } from "./triggers/onUserCreate";
setGlobalOptions({ maxInstances: 3 });

export { onUserCreate };

export { updateScheduledMessages };
