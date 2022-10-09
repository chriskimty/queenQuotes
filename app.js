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
    listElement.addEventListener("click", function (e) {
      // alert(this.innerHTML);
      e.preventDefault();
      app.hiddenSection.style.display = "block";
      app.hiddenSection.scrollIntoView({
        behavior: "smooth",
      });

      if (this.innerHTML == app.correctAnswer) {
        app.hiddenSection.style.display = "block";
        displayPhrase = document.createElement("p");
        displayPhrase.innerText = "Condragulations. You're a winner, baby!";
        app.confirmationContainer.appendChild(displayPhrase);
      } else {
        displayPhrase = document.createElement("p");
        displayPhrase.innerText =
          "Good God, Get a Grip Girl. Try again, hunty!";
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

  console.log(app.correctAnswer);
};

// Function to run events
app.events = function () {
  app.hiddenButton.addEventListener("click", function (e) {
    window.location.reload();
    app.quizSection.scrollIntoView({
      behavior: "smooth",
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
