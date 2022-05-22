import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

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