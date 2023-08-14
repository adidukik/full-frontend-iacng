// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrBsL95w9Qvl_lzNBCOmuA58RGhWtQBnk",
  authDomain: "auth-iacng-dashboard-frontend.firebaseapp.com",
  projectId: "auth-iacng-dashboard-frontend",
  storageBucket: "auth-iacng-dashboard-frontend.appspot.com",
  messagingSenderId: "543287634693",
  appId: "1:543287634693:web:e66907eafbb058a7d7e56c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default app;
