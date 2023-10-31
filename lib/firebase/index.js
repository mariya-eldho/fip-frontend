import { initializeApp, getApps } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfIIVxF0QQj9lYvyyLnDVrSD1ca4sdr8Y",
  authDomain: "food-intake-prediction.firebaseapp.com",
  projectId: "food-intake-prediction",
  storageBucket: "food-intake-prediction.appspot.com",
  messagingSenderId: "488831663822",
  appId: "1:488831663822:web:28ee81b2bd5f90165b5a9f",
};

const firebaseApp = !getApps.length ? initializeApp(firebaseConfig) : getApps();

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

export default firebaseApp;
