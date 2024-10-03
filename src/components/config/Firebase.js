import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAyxsQRJWWlfYq40zIYLVl8QoFvaQ8EROQ",
  authDomain: "authenticated-system.firebaseapp.com",
  databaseURL: "https://authenticated-system-default-rtdb.firebaseio.com",
  projectId: "authenticated-system",
  storageBucket: "authenticated-system.appspot.com",
  messagingSenderId: "672814667101",
  appId: "1:672814667101:web:8554301c5e14b4653c44b4",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
export {db, auth};
