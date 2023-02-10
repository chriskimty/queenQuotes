import  firebaseApp  from './firebase.js';
import {
  get,
  ref,
  getDatabase,
  push,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const database = getDatabase(firebaseApp);
const dbRef = ref(database);

// Create an app object
const app = {};

// DOM Elements
app.quoteContainer = document.querySelector(".quoteContainer");
app.ulContainer = document.querySelector("#ulContainer");
app.hiddenImg = document.querySelector("#hiddenImg");
app.hiddenSection = document.querySelector(".hiddenMain");
app.hiddenButton = document.querySelector(".hiddenButton");
app.confirmationContainer = document.querySelector(".confirmationContainer");
app.quizSection = document.querySelector("#quizSection");
app.startGame = document.querySelector(".startGame");
app.queenArray = [];


app.firebaseCall = () => {get(dbRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      app.queenArray = snapshot.val().queens;
      app.randomizer(app.queenArray);
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.log(error);
  });
}

// randomizer function to get a random queen index from the array
app.randomizer = (queenArray) => {
  const randomIndex = Math.floor(Math.random() * app.queenArray.length);
  // return queenArray.queens[randomIndex];
  console.log(app.queenArray[randomIndex])
};

// NEXT STEPS
// Use app.randomizer to select the queen1
// Display queen1 quote
// Display queen1 name(button)
// Run app.randomizer to select queen2 Name


// Function to select a queen
app.selectQueen = () => {

}

// Function to run events
app.events = function () {
  app.hiddenButton.addEventListener("click", function (e) {
    e.preventDefault()
    window.location.reload()
    window.location.assign('index.html#quizSection')
  });

  app.startGame.addEventListener("click", function (e) {
    e.preventDefault()
    app.quizSection.scrollIntoView({
      behavior: "smooth"
    });
  });
};

// init function
app.init = function () {
  app.events();
  app.firebaseCall();
  app.randomizer();
};

// call the init function
app.init();
