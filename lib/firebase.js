// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfIIVxF0QQj9lYvyyLnDVrSD1ca4sdr8Y",
  authDomain: "food-intake-prediction.firebaseapp.com",
  projectId: "food-intake-prediction",
  storageBucket: "food-intake-prediction.appspot.com",
  messagingSenderId: "488831663822",
  appId: "1:488831663822:web:28ee81b2bd5f90165b5a9f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

// const provider = new auth().GoogleAuthProvider();
// export const signInWithGoogle = () => auth.signInWithPopup(provider);
