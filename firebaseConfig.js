import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBIgJTRcKkPO-L_VkN-eBUXTPfVSb-XaTY",
    authDomain: "react-admin-7d848.firebaseapp.com",
    projectId: "react-admin-7d848",
    storageBucket: "react-admin-7d848.appspot.com",
    messagingSenderId: "1032502191866",
    appId: "1:1032502191866:web:edadeda1903517eb6b8b43",
    measurementId: "G-D7LWNF7T4S"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

if (!getApps().length) {
  initializeApp(firebaseConfig)
}

export const FirebaseAuth = getAuth()

export const Authentication = () => {
  return FirebaseAuth
}

export const SignUp = async (name, email, password) => {
  await createUserWithEmailAndPassword(FirebaseAuth, name, email, password)
}

export const SignIn = async (email, password) => {
  await signInWithEmailAndPassword(FirebaseAuth, email, password)
}

const clear = () => {
  setAuthUser(null);
  setLoading(true);
};

export const SignOut = async () => {
  await signOut(FirebaseAuth).then(clear);
}