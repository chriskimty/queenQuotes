//     "id": 89,
//     "name": 'Trixie Matel',
//     "winner": false,
//     "missCongeniality": false,
//     "quote": 'Okay, calm down there public school.',
//     "image_url": 'http://trixie-matel.com/213131.jpg'

// Create an app object (dragApp)
const app = {};

// Base URL
const url = new URL("http://www.nokeynoshade.party/api/queens/all");

// fetch(url)
//   .then((result) => result.json())
//   .then((data) => {
//     console.log(data);
//   });

// Method: Randomizer function
app.randomizer = function (array) {
  return Math.floor(Math.random() * array.length);
};

// When the page loads (when app.init is called), call the method where the API will generate a randomized quote (property: quote) will appear in the .quoteContainer.
app.getRandomQuote = function () {
  const quoteContainer = document.querySelector(".quoteContainer");
  const correctAnswerContainer = document.querySelector(".option1");
  const hiddenImg = document.querySelector("#hiddenImg");
  fetch(url)
    .then((apiPromise) => {
      return apiPromise.json();
    })
    .then((data) => {
      let randomIndex = app.randomizer(data);
      const regExp = /[a-zA-Z]/;
      //It would only trigger if it doesn't have letters
      while (!regExp.test(data[randomIndex].quote)) {
        randomIndex = app.randomizer(data);
      }
      return (
        (quoteContainer.innerHTML = [data[randomIndex].quote]) &&
        (correctAnswerContainer.innerHTML = [data[randomIndex].name]) &&
        (hiddenImg.src = [data[randomIndex].image_url])
      );
 
    });
};

// When the page loads, call the method where the API will generate two randomized queen's names (property: name) will appear in the <li> .answersContainer.
app.getRandomQueenName = function () {
  const wrongAnswerContainer = document.querySelector(".option2");

  fetch(url)
    .then((apiPromise) => {
      return apiPromise.json();
    })
    .then(
      (data) => {
        const randomIndex = app.randomizer(data);
        return (wrongAnswerContainer.innerHTML = [data[randomIndex].name]);
        // PROBLEM 2: Need to add an if statement so that this random queen is not the same queen as the id of the 'random quote/random queen name'
      }

      // javascript shuffle array values

      // PROBLEM 3: need to randomize the answers in the <li> so that the correct answer is not
      // IF the randomized quote generated = odd number id
      // then, return: correctAnswerContainer = document.querySelector(".option1");
      // the "incorrect answer" (randomized queen's name) MUST be an even id #
      // then, return wrongAnswerContainer.innerHTML = a randomIndex of a queen with an even id#

      // ELSE, the id of the random quote = even number,
      // then, return: const correctAnswerContainer = document.querySelector(".option2");
      // the "incorrect answer" (randomized queen's name) MUST be an odd id #
    );
};

// addEventListener: once the user clicks on one of the <li> answers,
// If they click the correct answer, the answer will turn green

// Else (if they click the incorrect answer), it will turn red

// The .hiddenMain section (previously display: none) will display: block. In .hiddenMain, the user will be able to see the .hiddenButtonContainer which contains the 'replay' button to replay the game. In this div, call the API (property: img_url)

// addEventListener: when the user clicks the 'replay' button,

// .hiddenMain will be hidden away again

// The page is refreshed on the id #quizSection

app.init = function () {
  app.getRandomQuote();
  app.getRandomQueenName();
};

app.init();
