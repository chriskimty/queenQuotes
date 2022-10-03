//     "id": 89,
//     "name": 'Trixie Matel',
//     "winner": false,
//     "missCongeniality": false,
//     "quote": 'Okay, calm down there public school.',
//     "image_url": 'http://trixie-matel.com/213131.jpg'

    
// Create an app object (dragApp)
const dragApp = {};

const dragUrl = new URL('http://www.nokeynoshade.party/api/queens/all')


fetch(dragUrl)
    .then((apiPromise) => {
        return apiPromise.json();
    }).then((apiData) => {
        console.log('queensssss', apiData)
    })


// When the page loads (when app.init is called), call the method where the API will generate a randomized quote (property: quote) will appear in the .quoteContainer. 


// When the page loads, call the method where the API will generate two randomized queen’s names (property: name) will appear in the <li> .answersContainer.


// One of the answers needs to be within the same id as the id of the randomized quote (Correct answer).


// The other answer needs to be a randomized id with the exception of the id that is the correct answer (Incorrect answer).

    
// addEventListener: once the user clicks on one of the <li> answers, 
    // If they click the correct answer, the answer will turn green

    // Else (if they click the incorrect answer), it will turn red

    // The .hiddenMain section (previously display: none) will display: block. In .hiddenMain, the user will be able to see the .hiddenButtonContainer which contains the ‘replay’ button to replay the game. In this div, call the API (property: img_url)

// addEventListener: when the user clicks the ‘replay’ button,

    // .hiddenMain will be hidden away again

    // The page is refreshed on the id #quizSection

    // (ensure that when the page is refreshed, a new randomized set of quote/answers come up - will we have to remove any default settings?)
        




