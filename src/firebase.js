import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);

export const onContainers = (cb, id = "container") =>
  onValue(ref(db, `/${id}`), snap => cb(snap.val() || {}));

export const onStats = (cb, id = "container") =>
  onValue(ref(db, `/${id}/stats`), snap => cb(snap.val() || {}));

export const onHours = (cb, id = "container") =>
  onValue(ref(db, `/${id}/hours`), snap => cb(snap.val() || {}));
