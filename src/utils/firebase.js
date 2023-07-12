// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0aUKI-uTX7zGu7pky8OJ_xDQsHIp0xtU",
  authDomain: "chat-bot-5ceaf.firebaseapp.com",
  projectId: "chat-bot-5ceaf",
  storageBucket: "chat-bot-5ceaf.appspot.com",
  messagingSenderId: "171114281459",
  appId: "1:171114281459:web:10c40f4c4cc3742cd47a86"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

