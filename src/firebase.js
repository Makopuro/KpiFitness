import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBlgb_-WQkiqtPGRErUK1Kl0ERVl1HShLQ",
    authDomain: "kpifitness.firebaseapp.com",
    projectId: "kpifitness",
    storageBucket: "kpifitness.firebasestorage.app",
    messagingSenderId: "246062683158",
    appId: "1:246062683158:web:1a0d7386ad743971135137",
    measurementId: "G-LP19KYKYS4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };