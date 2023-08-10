// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsMGVo7M0HZgAb-EdnN1aekK5nt8yNCzA",
  authDomain: "xspiracy-testing.firebaseapp.com",
  projectId: "xspiracy-testing",
  storageBucket: "xspiracy-testing.appspot.com",
  messagingSenderId: "732196846036",
  appId: "1:732196846036:web:07ddc207c68d5c1a89be41",
  measurementId: "G-8B9LVTGMGE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);

export const getFirebase = ()=>{
    return app;
};

export const getSavedFireStore = ()=>{
    return firestore;
};
