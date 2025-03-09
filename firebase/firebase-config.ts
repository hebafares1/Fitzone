import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // For Firestore
import { getDatabase } from "firebase/database"; // For Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyDj8zyQgo4GupvFftxkP5reiVfXko4KyBU",
  authDomain: "fitzone-50f82.firebaseapp.com",
  projectId: "fitzone-50f82",
  storageBucket: "fitzone-50f82.firebasestorage.app",
  messagingSenderId: "99142205557",
  appId: "1:99142205557:web:34df1b1b206b38de0db83c",
  measurementId: "G-HW3HFH9YGX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const database = getDatabase(app);

export { auth, firestore, database };
