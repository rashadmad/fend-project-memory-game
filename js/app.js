/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const cards = document.querySelectorAll('.card');
const card = document.querySelector('.card');
const match = document.querySelectorAll('.match');
const deck = document.querySelector('.deck');
const fontAwe = document.querySelector('.fa');
const fontAweAll = document.querySelectorAll('.fa');
const moves = document.querySelector('.moves');
const resetButton = document.querySelector('.fa-repeat');

const overlay = document.createElement("div");
const overlayHeader = document.createElement("h1").textContent = "Congratulations";

let counter = 0;
let matchsMade = 0;
let starRating = 3;

resetButton.addEventListener('click', reset, false);
resetButton.addEventListener('onload', reset, false);

function completionReset(){
  overlay.parentElement.removeChild(overlay);
  console.log("works");
  reset();
}

//shuffles the cards upon page load upon press of the reset button or on page load
function reset(overlayOpen) {
  counter = 0;
  matchsMade = 0;
  let movesText = document.querySelector('.moves').textContent = counter.toString();
  movesText = 0;
  for (var i = deck.children.length; i >= 0; i--) {
    deck.appendChild(deck.children[Math.random() * i | 0]);
  }
  //checks all of the cards for matchs after finding any it set them back to normal
  for (var i = 0; i < cards.length; i++) {

    if (cards[i].classList.contains("match") || cards[i].classList.contains("open") || cards[i].classList.contains("show")) {
      console.log("system Fire");
      cards[i].classList.remove("match", "open", "show");
    }
  }
}

function win() {
  setTimeout(function() {
    const str = '<h1 id="congrats">' + 'Congratulations' + '</li>' +
      '<br>' + '<p class = "blue">' + 'Your score was </p>' +
      '<p class = "blue">your star rating is ' + starRating + ' it took you ' + counter + ' moves to finsh</p>' +
      '<p>Thank you for playing</p>'
      '<p class="blue">Would you like to play agin?</p>' +
      '<button onclick="completionReset()">Play Agin</button>';
    console.log(overlay.parentElement);

    overlay.innerHTML = str;
    overlay.setAttribute("id", "overlay");
    overlay.setAttribute("class", "overlay");
    document.body.appendChild(overlay);
  }, 1000);
}

let firstNsecond = [];
let firstNsecondChildren = [];
let matchFound = false;
let firstCard = "";
let secondCard = "";

let secoundCardClicked = false;
//flips the cards over after they have been compared
function flip(cardMatch, cardOne, cardTwo) {

  if (cardMatch === true) {
    cardOne.toggle("match");
    cardTwo.toggle("match");
  } else {
    //this delay allows the user to see the secound card clicked before flipinng
    //it back over
    setTimeout(function() {
      cardOne.toggle("open");
      cardOne.toggle("show");
      cardTwo.toggle("open");
      cardTwo.toggle("show");
    }, 1000);

  }
};

//click action
function checkMatch() {
  //progresses a counter attached to the moves span
  counter++;

  if (counter==30){
    const firstStar = document.querySelector('#first');
    firstStar.classList.toggle("fa");
    firstStar.classList.toggle("far");
    starRating++;
  }
  if (counter==40){
    const secoundStar = document.querySelector('#secound');
    secoundStar.classList.toggle("fa");
    secoundStar.classList.toggle("far");
    starRating++;
  }
  if (counter==60){
    const thirdStar = document.querySelector('#third');
    thirdStar.classList.toggle("fa");
    thirdStar.classList.toggle("far");
    starRating++;
  }

  //manipulates the dom to update the moves span number
  let movesText = document.querySelector('.moves').textContent = counter.toString();

  const clicked = this.classList;
  //makeing matched cards not apply as eventlisteners
  if (clicked.contains("match") || clicked.contains("show") || clicked.contains("open")) {
    this.removeEventListener('click', checkMatch, false);

  } else {
    //flips the card over
    this.classList.toggle("show");
    this.classList.toggle("open");

    //creates two arrays to hold the cards that were clicked and the classes of
    //both card flips
    clickedCard = this;
    clickedCardChildren = this.innerHTML;
    firstNsecond.push(clickedCard);
    firstNsecondChildren.push(clickedCardChildren);

    //this finds out when two cards have been clicked
    if (firstNsecond.length === 2) {

      //creates varibles that hold the inner classes of the two cards clicked
      let firstCardChild = firstNsecondChildren[0];
      let secondCardChild = firstNsecondChildren[1];
      let firstCard = firstNsecond[0].classList;
      let secondCard = firstNsecond[1].classList;

      //this checks if the two cards match
      if (firstCardChild === secondCardChild) {

        //when a match is found
        matchsMade += 1;
        console.log(matchsMade + " matchs made");
        if (matchsMade === 8) {
          //yay you win
          win();
        }
        flip(true, firstCard, secondCard)
        //emptys out the arrays
        firstNsecondChildren = [];
        firstNsecond = [];
        //if the cards dont match they need to both be fliped over
      } else {

        flip(false, firstCard, secondCard);
        //emptys out the arrays
        firstNsecondChildren = [];
        firstNsecond = [];
      }
    }
  }
}

//adds eventlisteners to all of the cards
for (var i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', checkMatch, false);
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
