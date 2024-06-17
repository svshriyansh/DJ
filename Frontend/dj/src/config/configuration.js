// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGOYfDGHsC_PeDitznX_0bP_8tsDaUmss",
  authDomain: "disk-jokey-6b5e4.firebaseapp.com",
  projectId: "disk-jokey-6b5e4",
  storageBucket: "disk-jokey-6b5e4.appspot.com",
  messagingSenderId: "335058123494",
  appId: "1:335058123494:web:48c25d9f0f340d01449927",
  measurementId: "G-MN7TLP5CD1",
};

// Initialize Firebase
let instance;

export default function getFirebase() {
  if (typeof window !== "undefined") {
    if (instance) return instance;
    instance = initializeApp(firebaseConfig);
    return instance;
  }

  return null;
}
