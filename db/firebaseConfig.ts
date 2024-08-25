import { FirebaseApp, getApps, initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/database";
// import {...} from "firebase/functions";
 import {getFirestore} from "firebase/firestore";
 import {getAuth} from "firebase/auth";
 import {getStorage} from "firebase/storage";

 
  


// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  authDomain: "hotelads-afc8e.firebaseapp.com",
  projectId: "hotelads-afc8e",
  storageBucket: "hotelads-afc8e.appspot.com",
  messagingSenderId: "999860392101",
  appId: "1:999860392101:web:5b8f378423e81f3ec6fd4c",
  measurementId: "G-12WMZGHN2C"
  };



  export const app  = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps();

  const myAuth = () => getAuth(app as FirebaseApp);
  const myStorage = () => getStorage(app as FirebaseApp);
  const myDb = () => getFirestore(app as FirebaseApp);
  
  export const auth = myAuth();
  export const storage = myStorage();
  export const db = myDb();