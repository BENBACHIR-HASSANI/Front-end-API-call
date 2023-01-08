// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUDLI6wG3O6iWmjVoTWLFfZZhgtLCHZ8g",
  authDomain: "recipes-6de88.firebaseapp.com",
  projectId: "recipes-6de88",
  storageBucket: "recipes-6de88.appspot.com",
  messagingSenderId: "19945772759",
  appId: "1:19945772759:web:780421fb75ed77cc4ac292",
  measurementId: "G-1CDK45RFNY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
