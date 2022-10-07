// Create an app object
const app = {};

// DOM Elements
app.quoteContainer = document.querySelector(".quoteContainer");
app.correctAnswerContainer = document.querySelector(".option1");
app.wrongAnswerContainer = document.querySelector(".option2");
app.hiddenImg = document.querySelector("#hiddenImg");

// Randomizer function to get a random queen index from the array 
app.randomizer = function (queenArray) {
  const randomIndex = Math.floor(Math.random() * queenArray.length);
  return queenArray[randomIndex];
};

// async await fetch request 
app.getQueens = async function () {
  const apiPromise = await fetch(
    "http://www.nokeynoshade.party/api/queens/all"
  );
  const data = await apiPromise.json();

// variables to access a randomized queen index for the correct and wrong answers 
  app.correctQueen = app.randomizer(data);
  app.wrongQueen = app.randomizer(data);

// regular expression to verify if the randomized queen index selected has a valid quote (! == "" || ! == ""\"\"")
  const regExp = /[a-zA-Z]/;
  //loop through the array until app.randomizer accesses a valid quote 
  while (!regExp.test(app.correctQueen.quote)) {
    app.correctQueen = app.randomizer(data);
  }
// Display the randomized queens properties onto the selected DOM elements 
  app.quoteContainer.innerHTML = app.correctQueen.quote;
  app.correctAnswerContainer.innerHTML = app.correctQueen.name;
  app.hiddenImg.src = app.correctQueen.image_url;
  app.wrongAnswerContainer.innerHTML = app.wrongQueen.name;
};

// PROBLEM 1: create a solution to avoid the wrong answer to be in the same index as the correct answer. 
    //Possible solution: Create a conditional in the app.wrongQueen variable which loops through the queen array until it gets a queen with a different index from the correct queen

// PROBLEM 2: create a solution so that the order that the answers displayed in the <li> are randomized 
    //Possible solution: find a way to display the answers on the <li> by increasing numerical order by index #

// addEventListener: once the user clicks on one of the <li> answers:
    // The .hiddenMain section (previously display: none) will display: block.
    // In.hiddenMain, the user will be able to see the image of the queen that was the correct answer.
    // The user will also be able to see a phrase confirming whether they selected the CORRECT or INCORRECT answer:
        // Correct answer phrase: "You're a winner, baby"
        // Incorrect answer phrase: "Good God, Get a Grip Girl."
    //The user can interact with the .hiddenButtonContainer which contains the 'replay' button to replay the game.
        //When the user presses the 'replay' button:
            //the .hiddenMain section will display: none
            // the page refreshes on the id #quizSection

// Init function 
app.init = function () {
  app.getQueens();
};

// Call the init function 
app.init();