// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_fIREBASE_APIKEY,
  authDomain: "loginvirtualcourses-3cb12.firebaseapp.com",
  projectId: "loginvirtualcourses-3cb12",
  storageBucket: "loginvirtualcourses-3cb12.firebasestorage.app",
  messagingSenderId: "117930055185",
  appId: "1:117930055185:web:8f690afd0841001c3a03b0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth,provider}