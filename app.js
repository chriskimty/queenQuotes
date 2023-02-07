<script type = "module">
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js"; 
</script>

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

const database = getDatabase(firebaseApp)
const dbRef = ref(database);
const queenData = get(dbRef).then((snapshot) => {
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

  console.log(queenData)
// Create an app object
// import firebaseApp from "./firebase";

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

// randomizer function to get a random queen index from the array
app.randomizer = function (queenArray) {
  const randomIndex = Math.floor(Math.random() * queenArray.length);
  return queenArray[randomIndex];
};

// async await fetch request
app.getQueens = async function () {
  try {
   const apiPromise = await fetch(
    "http://www.nokeynoshade.party/api/queens/all"
  );
  const data = await apiPromise.json(); 
 
  // variables to access two randomized queens index
  app.option1 = app.randomizer(data);
  app.option2 = app.randomizer(data);

  // regular expression to verify if the randomized queen index selected has a valid quote (!== "" || !== "\"\"")
  const regExp = /[a-zA-Z]/;
  //loop through the array until app.randomizer access a valid quote for option1 and option2
  while (!regExp.test(app.option1.quote)) {
    app.option1 = app.randomizer(data);
  }
  while (!regExp.test(app.option2.quote) || app.option2 === app.option1) {
    app.option2 = app.randomizer(data);
  }
    app.displayQueensData(app.option1, app.option2);
    
    } catch (err) {
    alert("Something went wrong. Please check your network connection and try again.", err);
    }
  app.displayAnswers();
};

// Function to display the randomized queens properties onto the selected DOM Elements
app.displayAnswers = function () {
  app.arrayOfQueens = [app.option1, app.option2];

  //For each option create elements to display the randomized queen names onto the page
  app.arrayOfQueens.forEach(function (queenObject) {
    listElement = document.createElement("li");
    listElement.innerText = queenObject.name;
    listElement.classList.add("button", "answers");
    app.ulContainer.appendChild(listElement);

    //Event Listener on the list elements (answer options) to display the hidden section
    listElement.addEventListener("click", function handler(e) {
      e.preventDefault()
      app.hiddenSection.style.display = "block";
      app.hiddenSection.scrollIntoView({
        behavior: "smooth"
      })
      //Once one of the options are clicked, disable pointer for both options
      app.ulContainer.style.pointerEvents = "none"

      //Messages are displayed according to the answer chosen
      if (this.innerHTML == app.correctAnswer) {
        app.hiddenSection.style.display = "block";
        displayPhrase = document.createElement("p");
        displayPhrase.innerText = "Condragulations. You're a winner, baby!";
        app.confirmationContainer.appendChild(displayPhrase)
        
      } else {
        displayPhrase = document.createElement("p");
        displayPhrase.innerText = "Good God, Get a Grip Girl. Try again, hunty!";
        app.confirmationContainer.appendChild(displayPhrase)
      }
    });
  });
};

// Function with if statement to designate the queen with the smaller index as the quote in question
app.displayQueensData = function () {
  if (app.option1.id < app.option2.id) {
    app.quoteContainer.innerHTML = app.option1.quote;
    app.hiddenImg.src = app.option1.image_url;
    app.correctAnswer = app.option1.name;
  } else {
    app.quoteContainer.innerHTML = app.option2.quote;
    app.hiddenImg.src = app.option2.image_url;
    app.correctAnswer = app.option2.name;
  }
};

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
  app.getQueens();
  app.events();
};

// call the init function
app.init();
