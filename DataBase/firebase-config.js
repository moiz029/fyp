import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCouvO-7gRBhfMOC5aIFAp4NAC2-IQwOro",
    authDomain: "madproject-069.firebaseapp.com",
    databaseURL: "https://madproject-069-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "madproject-069",
    storageBucket: "madproject-069.appspot.com",
    messagingSenderId: "762294691530",
    appId: "1:762294691530:web:27056d88569b545c007633",
    measurementId: "G-V7BTXHDX30"
  };

  const app = initializeApp(firebaseConfig)
  export const db = getFirestore(app)