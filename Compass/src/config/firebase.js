// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCbDt31AsohSi3SXGNvXc-WJYkHffg2cS4",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "compasstaskmanager.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID || "compasstaskmanager",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET || "compasstaskmanager.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDERID || "1040598440132",
  appId: import.meta.env.VITE_FIREBASE_APPID || "1:1040598440132:web:9c21bfb1d88ce4793dd191"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;