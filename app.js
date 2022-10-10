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
  while (!regExp.test(app.option2.quote)) {
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
    //*We might want to namespace this so all the events are in the same place? 
    listElement.addEventListener("click", function handler(e) {
      e.preventDefault()
      app.hiddenSection.style.display = "block";
      app.hiddenSection.scrollIntoView({
        behavior: "smooth",
      })

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
      e.currentTarget.removeEventListener(e.type,handler)
      //both of these (^this one, and the { once: true } below) achieve the same thing, but is not ideal because we could still click the OTHER button since we have a conditional.
    // }, { once: true });
      //also tried the below and some other disable = true, but does not work. Wondering if maybe we need to explore disabling the 'append Child' or the creation of a new Element once clicked, but was not able to find yet. Again, it might be an issue because we have a conditional. Most of the resources pertained to having a SINGLE submit button rather than two. Alternatively, we could add a "submit" button to submit answers but that might make us change the code again so.... 
      // app.answers = document.querySelectorAll(".answers");
      // const disableButton = () => {
      //   app.answers.disabled = true;
      // }
      // app.answers.addEventListener("click", disableButton);
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
  //Remove this before submission!
  // console.log(app.correctAnswer);
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
