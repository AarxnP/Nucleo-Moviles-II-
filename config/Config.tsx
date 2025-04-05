import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAJXfNert9jqy-8PXBAAJbLKsmrejXnMmU",
  authDomain: "app--1-bc5b0.firebaseapp.com",
  databaseURL: "https://app--1-bc5b0-default-rtdb.firebaseio.com",
  projectId: "app--1-bc5b0",
  storageBucket: "app--1-bc5b0.firebasestorage.app",
  messagingSenderId: "749821222726",
  appId: "1:749821222726:web:f1f971e0a962b49b4a8f47"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app)