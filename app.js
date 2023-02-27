import firebaseApp from "./firebase.js";
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

// randomizer function to get a random queen index from the array
app.randomizer = (queenArray) => {
  const randomIndex = Math.floor(Math.random() * app.queenArray.length);
  // console.log(app.queenArray[randomIndex])
  return app.queenArray[randomIndex];
};

app.firebaseCall = () => {
  get(dbRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
      app.queenArray = snapshot.val().queens;
      app.queen1 = app.randomizer(app.queenArray);
      app.queen2 = app.randomizer(app.queenArray);
        app.displayAnswers();
        app.selectAnswer();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.log(error);
    })
};

app.displayAnswers = () => {
  app.possibleAnswers = [app.queen1.name, app.queen2.name];

  if (app.queen1.id < app.queen2.id) {
    app.quoteContainer.innerHTML = app.queen1.quote;
    app.hiddenImg.src = app.queen1.image_url;
    app.correctAnswer = app.queen1.name;
  } else {
    app.quoteContainer.innerHTML = app.queen2.quote;
    app.hiddenImg.src = app.queen2.image_url;
    app.correctAnswer = app.queen2.name;
  }

  app.possibleAnswers.forEach((element) => {
    const listElement = document.createElement("li");
    const queenOptions = document.createTextNode(element);
    listElement.appendChild(queenOptions);
    listElement.classList.add("button", "answers");
    app.ulContainer.appendChild(listElement)
  })
};

app.selectAnswer = () => {
  app.answers = app.ulContainer.children;
  for (let i = 0; i < app.answers.length; i++) {
    app.answers[i].addEventListener("click", (e) => {
      e.preventDefault();
      app.hiddenSection.style.display = "block";
      app.hiddenSection.scrollIntoView({
        behavior: "smooth",
      });
      app.ulContainer.style.pointerEvents = "none";

      if (app.answers[i].innerHTML === app.correctAnswer) {
        app.hiddenSection.style.display = "block";
        let displayPhrase = document.createElement("p");
        displayPhrase.innerText = "Condragulations. You're a winner, baby!";
        app.confirmationContainer.appendChild(displayPhrase);
      } else {
        let displayPhrase = document.createElement("p");
        displayPhrase.innerText =
          "Good God, Get a Grip Girl. Try again, hunty!";
        app.confirmationContainer.appendChild(displayPhrase);
      }
    });
  }
}

// Function to run events
app.events = () => {
  app.hiddenButton.addEventListener("click", function (e){
    e.preventDefault();
    window.location.reload();
    window.location.assign("index.html#quizSection");
  });

  app.startGame.addEventListener("click", function (e) {
    e.preventDefault();
    app.quizSection.scrollIntoView({
      behavior: "smooth",
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
