import { getAnalytics, logEvent } from "firebase/analytics";
import { app } from "./firebase";

const analytics = getAnalytics(app);
logEvent(analytics, "notification_received");
