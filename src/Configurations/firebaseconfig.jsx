import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3uI98PZJmtddGGNq-yCaWP8QH916pvNM",
  authDomain: "blogs-add-appp.firebaseapp.com",
  projectId: "blogs-add-appp",
  storageBucket: "blogs-add-appp.appspot.com",
  messagingSenderId: "191144754892",
  appId: "1:191144754892:web:def097070e9495f0c6cc69",
  measurementId: "G-1P5WH6RN20"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);