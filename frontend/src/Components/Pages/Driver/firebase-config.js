import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyC7VrjecGd4uZNmvMQznhVn9Z-qsPPG8N0",
  authDomain: "finalprojectsaveimage.firebaseapp.com",
  projectId: "finalprojectsaveimage",
  storageBucket: "finalprojectsaveimage.appspot.com",
  messagingSenderId: "541983663094",
  appId: "1:541983663094:web:d5ed2b30935b6d33d55dd7",
  measurementId: "G-M0WM9GLQ5Q"
};


const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)
