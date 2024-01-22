// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqMFrFQ6wYEdNByAZvXSBfmIKdyhxMHJs",
  authDomain: "aricavivapp.firebaseapp.com",
  projectId: "aricavivapp",
  storageBucket: "aricavivapp.appspot.com",
  messagingSenderId: "381349754228",
  appId: "1:381349754228:web:12c3c73b27808463cb6821"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase