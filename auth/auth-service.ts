import { auth } from "../firebase/firebase-config";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  get,
  DatabaseReference,
  DataSnapshot,
} from "firebase/database";
import { SignUpData, LoginData, User } from "../types/user-types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signUpWithEmailPassword = async ({
  email,
  password,
  name,
}: SignUpData): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userId = userCredential.user.uid;
    const db = getDatabase();
    await set(ref(db, "users/" + userId), {
      name,
      email,
    });

    return userCredential;
  } catch (error) {
    throw error;
  }
};

export const loginWithEmailPassword = async ({
  email,
  password,
}: LoginData): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userId = userCredential.user.uid;
    const db = getDatabase();
    const userRef: DatabaseReference = ref(db, "users/" + userId);
    const snapshot: DataSnapshot = await get(userRef);

    if (snapshot.exists()) {
      const userData: User = snapshot.val();
      AsyncStorage.setItem("user", JSON.stringify(userData));
    } else {
      console.log("No user data found.");
    }

    return userCredential;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent!");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};
