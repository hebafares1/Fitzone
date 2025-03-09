import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // For Firestore
import { getDatabase } from "firebase/database"; // For Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyDKS0MtupvttwK7lnYEuxTegjmQY9JLF8s",
  authDomain: "fitzone-a3f25.firebaseapp.com",
  databaseURL:
    "https://fitzone-a3f25-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fitzone-a3f25",
  storageBucket: "fitzone-a3f25.firebasestorage.app",
  messagingSenderId: "944600278679",
  appId: "1:944600278679:web:3f18f8755cdcb33c8eabd2",
  measurementId: "G-HVN1LYHFY7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const database = getDatabase(app);

export { auth, firestore, database };
