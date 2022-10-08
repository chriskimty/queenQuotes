// Create an app object
const app = {};

// DOM Elements
app.quoteContainer = document.querySelector(".quoteContainer");
app.ulContainer = document.querySelector("#ulContainer");
app.hiddenImg = document.querySelector("#hiddenImg");
app.hiddenSection = document.querySelector(".hiddenMain");
app.hiddenButton = document.querySelector(".hiddenButton");
app.confirmationContainer = document.querySelector(".confirmationContainer");

// randomizer function to get a random queen index from the array
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

  // variables to access two randomized queens index
  app.option1 = app.randomizer(data);
  app.option2 = app.randomizer(data);

  // regular expression to verify if the randomized queen index selected has a valid quote (!== "" || !== "\"\"")
  const regExp = /[a-zA-Z]/;
  //loop through the array until app.randomizer access a valid quote for option1 and option2
  while (!regExp.test(app.option1.quote)) {
    app.option1 = app.randomizer(data);
  }
  while (!regExp.test(app.option2.quote)) {
    app.option2 = app.randomizer(data);
  }

  app.displayQueensData(app.option1, app.option2);
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
      
  //Event Listener on the list elements to show hidden section
      //Problem 1: figure out how to target the correctAnswer variable to target it for the different pharases - DONE! 
      //Problem 2: when buttons are clicked, the window should scroll down to the hiddenMain - DONE!
      //Problem 3: only allow the element <p> to be created once
      listElement.addEventListener('click', function (e) {
        // alert(this.innerHTML);
        e.preventDefault()
        app.hiddenSection.style.display = "block";
        app.hiddenSection.scrollIntoView({
          behavior: 'smooth'
        });
  
        if (this.innerHTML == app.correctAnswer) {
          app.hiddenSection.style.display = "block";
          displayPhrase = document.createElement("p");
          displayPhrase.innerText = "Condragulations. You're a winner, baby!";
          app.confirmationContainer.appendChild(displayPhrase);
        } else {
          displayPhrase = document.createElement("p");
          displayPhrase.innerText = "Good God, Get a Grip Girl. Try again, hunty!";
          app.confirmationContainer.appendChild(displayPhrase);
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

  console.log(app.correctAnswer)
};

// addEventListener: once the user clicks on one of the <li> answers:
// The .hiddenMain section (previously display: none) will display: block.
// In.hiddenMain, the user will be able to see the image of the queen that was the correct answer.


// The user will also be able to see a phrase confirming whether they selected the CORRECT or INCORRECT answer:
// Correct answer phrase: "You're a winner, baby"
// Incorrect answer phrase: "Good God, Get a Grip Girl."
//The user can interact with the .hiddenButtonContainer which contains the 'replay' button to replay the game.
//When the user presses the 'replay' button:
// //the .hiddenMain section will display: none
// // the page refreshes on the id #quizSection

// Function to run events
app.events = function () {
 app.hiddenButton.addEventListener('click', function (e){
  //  app.hiddenSection.style.display = "none"
   window.location.reload();
   //Problem 4: Figure out how to keep the screen on the main quiz section
 })
//   window.addEventListener("load", (event) => {
// })
  }
  

  // init function
  app.init = function () {
    app.getQueens();
    app.events();
  };
  
  // call the init function
  app.init();