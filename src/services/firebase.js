import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAxE2WhnTPnIpFtDbYrEYUECESqqRc7S_U",
  authDomain: "plataformaeadelaborbr.firebaseapp.com",
  projectId: "plataformaeadelaborbr",
  storageBucket: "plataformaeadelaborbr.firebasestorage.app",
  messagingSenderId: "321380639732",
  appId: "1:321380639732:web:d46e277faf60149c0f0fa1",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
