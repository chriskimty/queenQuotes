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
    // app.hiddenImg.src = app.option1.image_url;
    app.correctAnswer = app.queen1.name;
  } else {
    app.quoteContainer.innerHTML = app.queen2.quote;
    // app.hiddenImg.src = app.option2.image_url;
    app.correctAnswer = app.queen2.name;
  }
    app.possibleAnswers.forEach((element) => {
    const listElement = document.createElement("li");
    const queenOptions = document.createTextNode(element);
    listElement.appendChild(queenOptions);
    listElement.classList.add("button", "answers");  
    app.ulContainer.appendChild(listElement)
    })
  
  // app.answers.addEventListener("click", (e) => {
  //   e.preventDefault();
  //   console.log("hehe");
  // });
};
app.test = () => {
  // const list = app.ulContainer.children
  // if (list.item === app.correctAnswer) {
  //   console.log('hi')
  // } else {
  //   console.log('bye')
  // }
  document.querySelector("answers").click(console.log('hi'));
}
// console.log(app.ulContainer.children.item(0));
// app.selectAnswer = () => {
//   app.ulContainer.children.addEventListener("click", (e) => {
//     e.preventDefault();
//     console.log('hi')
//   })
// }

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
  // app.selectAnswer();
  app.events();
  app.firebaseCall();
  app.randomizer();
  app.test();
};

// call the init function
app.init();
