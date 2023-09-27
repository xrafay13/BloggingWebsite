import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAe0vVHK9gCwgrhDzGreAiulYOQj9JmH2A",
  authDomain: "bloggingwebsite-23a96.firebaseapp.com",
  projectId: "bloggingwebsite-23a96",
  storageBucket: "bloggingwebsite-23a96.appspot.com",
  messagingSenderId: "53146734091",
  appId: "1:53146734091:web:ae90678028960ffce4410e",
  measurementId: "G-MGFE632MY0",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const imgdb = getStorage(app);
const txtdb = getFirestore(app);
export const auth = getAuth(app);
export { imgdb, txtdb };
