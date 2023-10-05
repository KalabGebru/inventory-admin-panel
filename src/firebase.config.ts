// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrleMBHQneQXIiVCqHGNiLCcf5WDxjppM",
  authDomain: "inventory-app-b78f3.firebaseapp.com",
  projectId: "inventory-app-b78f3",
  storageBucket: "inventory-app-b78f3.appspot.com",
  messagingSenderId: "913478977864",
  appId: "1:913478977864:web:cad199d0f7e65502ff4b7d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };