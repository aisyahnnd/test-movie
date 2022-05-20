import { initializeApp, getApps } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBIgJTRcKkPO-L_VkN-eBUXTPfVSb-XaTY",
  authDomain: "react-admin-7d848.firebaseapp.com",
  projectId: "react-admin-7d848",
  storageBucket: "react-admin-7d848.appspot.com",
  messagingSenderId: "1032502191866",
  appId: "1:1032502191866:web:edadeda1903517eb6b8b43",
  measurementId: "G-D7LWNF7T4S"
};

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

export const SignOut = async () => {
  await signOut(FirebaseAuth)
}

export const GetSignInErrorMessage = (code) => {
  switch (code) {
    case 'auth/user-not-found':
      return 'Email tidak terdaftar'
    case 'auth/wrong-password':
    default:
      return 'Email atau password salah'
  }
}
