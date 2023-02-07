// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getDatabase, ref, get} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js"; 

import { module } from "https://www.gstatic.com/firebasejs/VERSION/firebase-DEPENDENCY.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXP6Y9THtiIK1qfh_pkqyP68o-Gb0isPc",
  authDomain: "drag-race-9a259.firebaseapp.com",
  projectId: "drag-race-9a259",
  storageBucket: "drag-race-9a259.appspot.com",
  messagingSenderId: "786889324051",
  appId: "1:786889324051:web:67da2a403c36be7db971e6"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const database = getDatabase(firebaseApp)
export const dbRef = ref(database);
export const queenData = get(dbRef).then((snapshot) => {
    // One of the returned values is a method called ".exists()", which will return a boolean value for whether there is a returned value from our "get" function 
    if(snapshot.exists()){
      // We call `.val()` on our snapshot to get the contents of our data. The returned data will be an object that we can  iterate through later
      console.log(snapshot.val())
    }else{
      console.log("No data available")
    }
  }).catch((error) => {
    console.log(error)
  })

export default firebaseApp 

