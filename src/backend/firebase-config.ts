// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,  GoogleAuthProvider  } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGmhO_X68dTfxaT5vTmtnaAZotL8e5Zfg",
  authDomain: "wedding-f87da.firebaseapp.com",
  projectId: "wedding-f87da",
  storageBucket: "wedding-f87da.appspot.com",
  messagingSenderId: "394802737392",
  appId: "1:394802737392:web:b451d8ac6667c23d639235",
  measurementId: "G-NXGL7S2ZM6"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Analytics 
const analytics = getAnalytics(app);
export const auth = getAuth(app); 
export const db = getFirestore(app); 
export const storage = getStorage(app); 
export const googleProvider = new GoogleAuthProvider();
