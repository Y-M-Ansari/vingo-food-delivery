// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: "vingo-food-delivery-app-10c18.firebaseapp.com",
    projectId: "vingo-food-delivery-app-10c18",
    storageBucket: "vingo-food-delivery-app-10c18.firebasestorage.app",
    messagingSenderId: "87572631149",
    appId: "1:87572631149:web:8dbd58b6c83a5e6854b964",
    measurementId: "G-SKQLC0F4HG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export {app,auth}