import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBJNB-yTysbWY5LOXStdIWsTEkbGJL69l8",
  authDomain: "cards-edd78.firebaseapp.com",
  databaseURL: "https://cards-edd78-default-rtdb.firebaseio.com",
  projectId: "cards-edd78",
  storageBucket: "cards-edd78.appspot.com",
  messagingSenderId: "596582187532",
  appId: "1:596582187532:web:e69f479dc863281068a429"
};
// initialize firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
