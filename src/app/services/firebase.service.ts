// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBZMSAfXqoSUQIE7bVeejLbY1Voh0hBMw",
  authDomain: "by1-1db5a.firebaseapp.com",
  projectId: "by1-1db5a",
  storageBucket: "by1-1db5a.appspot.com",
  messagingSenderId: "1094010415075",
  appId: "1:1094010415075:web:fbd7f8ef0e9d5bb9fea2d6",
  measurementId: "G-GYDR2YGDCJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);