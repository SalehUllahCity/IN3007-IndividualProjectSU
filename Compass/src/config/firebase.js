// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbDt31AsohSi3SXGNvXc-WJYkHffg2cS4",
  authDomain: "compasstaskmanager.firebaseapp.com",
  projectId: "compasstaskmanager",
  storageBucket: "compasstaskmanager.firebasestorage.app",
  messagingSenderId: "1040598440132",
  appId: "1:1040598440132:web:9c21bfb1d88ce4793dd191"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;