/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const deck = document.querySelector('.deck');
const card = document.querySelectorAll('.card');
const match = document.querySelectorAll('.match');
let firstNsecond = [];
let firstNsecondChildren = [];
let matchFound = false;
let firstCard = "";
let secondCard = "";

let secoundCardClicked = false;
//flips the cards over after they have been compared
function flip(cardMatch,cardOne,cardTwo){
  cardMatch = true;
  if(cardMatch === true){
    cardOne.toggle("match");
    cardTwo.toggle("match");
  } else {
    cardOne.toggle("open");
    cardOne.toggle("show");
    cardTwo.toggle("open");
    cardTwo.toggle("show");

    }
};


//click action
function checkMatch() {
  const clicked = this.classList;

  //makeing matched cards not apply as eventlisteners
  if (clicked.contains("match") || clicked.contains("show") || clicked.contains("open")) {
    this.removeEventListener('click', checkMatch, false);

  } else {
    //flips the card over
    this.classList.toggle("show");
    this.classList.toggle("open");
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

      //this checks if the two cards class
      if (firstCardChild === secondCardChild) {

          flip(true,firstCard,secondCard)
          //emptys out the arrays
          firstNsecondChildren = [];
          firstNsecond = [];
          //if the cards dont match they need to both be fliped over
      } else {
        firstCard = firstNsecond[0].classList;
        secondCard = firstNsecond[1].classList;
        setTimeout(flip(false,firstCard,secondCard), 0);
          console.log(firstNsecond);
        firstNsecondChildren = [];
        firstNsecond = [];
      }
    }
  }
}


//adds eventlisteners to all of the cards
for (var i = 0; i < card.length; i++) {
  card[i].addEventListener('click', checkMatch, false);

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
