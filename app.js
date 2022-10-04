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

// Method: Randomizer function
app.randomizer = function (array) {
    return Math.floor(Math.random() * array.length)
}; 

// When the page loads (when app.init is called), call the method where the API will generate a randomized quote (property: quote) will appear in the .quoteContainer. 
app.getRandomQuote = function () {
    const quoteContainer = document.querySelector(".quoteContainer");
    const correctAnswerContainer = document.querySelector(".option1");
    const hiddenImg = document.querySelector('#hiddenImg');
    fetch(url)
        .then((apiPromise) => {
            return apiPromise.json();
        })
        .then((data) => {
            const randomIndex = app.randomizer(data)
            return (quoteContainer.innerHTML = [data[randomIndex].quote]) && (correctAnswerContainer.innerHTML = [data[randomIndex].name]) && (hiddenImg.src = [data[randomIndex].image_url]);
            // PROBLEM 1: Come back to this for error handling using conditionals so that if it is an empty string "", either get it to show a default quote that we picked, or move it to the next one, etc. (***On the API, the empty quote strings look like: quote: "\"\"")
        }
    );
};

// When the page loads, call the method where the API will generate two randomized queen's names (property: name) will appear in the <li> .answersContainer.
app.getRandomQueenName = function () {
    const wrongAnswerContainer = document.querySelector(".option2");
    
    fetch(url)
        .then((apiPromise) => {
            return apiPromise.json();
        })
        .then((data) => {
            const randomIndex = app.randomizer(data)
            return wrongAnswerContainer.innerHTML = [data[randomIndex].name];
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
}

// addEventListener: once the user clicks on one of the <li> answers,
// If they click the correct answer, the answer will turn green

// Else (if they click the incorrect answer), it will turn red

// The .hiddenMain section (previously display: none) will display: block. In .hiddenMain, the user will be able to see the .hiddenButtonContainer which contains the 'replay' button to replay the game. In this div, call the API (property: img_url)





// addEventListener: when the user clicks the 'replay' button,

// .hiddenMain will be hidden away again

// The page is refreshed on the id #quizSection

app.init = function () {
    app.getRandomQuote()
    app.getRandomQueenName()
};

app.init();