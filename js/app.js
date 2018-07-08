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
const resetButton = document.querySelector('.fa-repeat');
const playAginButton = document.createElement("button").textContent = "Play Agin";
const firstStar = document.querySelector('#first');
const secoundStar = document.querySelector('#secound');
const thirdStar = document.querySelector('#third');
const clock = document.createElement("TIME");
const myScorePanel = document.querySelector('.score-panel');
let movesText = document.querySelector('#moves');

const overlay = document.createElement("div");
const overlayHeader = document.createElement("h1").textContent = "Congratulations";

let counter = 0;
let matchsMade = 0;
let starRating = 3;

let sec = 0;
let min = 0;

  setInterval(function(){
    sec++
    console.log(sec + " secounds");
    if(sec === 60) {
      sec = 0;
    }
  }, 1000);

  setInterval(function(){
    min++
    console.log(min + " minutes");
  }, 60000);

clock.innerHTML ='<i class="far fa-clock" style="margin-left: 9px; font-size: 1.1rem;"></i> ' + min +' min' + '  ' + sec + ' sec';
myScorePanel.appendChild(clock);

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
  starRating = 3;
  movesText = counter.toString();

  pointSystem(false,true);

  for (let i = deck.children.length; i >= 0; i--) {
    deck.appendChild(deck.children[Math.random() * i | 0]);
  }
  //checks all of the cards for matchs after finding any it set them back to normal
  for (let i = 0; i < cards.length; i++) {

    if (cards[i].classList.contains("match") || cards[i].classList.contains("open") || cards[i].classList.contains("show")) {
      console.log("system Fire");
      cards[i].classList.remove("match", "open", "show");
    }
  }
}

function win() {
  setTimeout(function() {
    const str = '<div id="congrats"><h1>Congratulations You win.</h1>' + '<h1>' + 'Here is your score.</h1>' + '<p style="font-size: 1.5rem;" class = "blue">Your star rating is ' + starRating + '</p>' + '<p style="font-size: 1.5rem;" class = "blue"> it took you ' + counter + ' moves to finsh</p>' + '<h1>Thank you for playing</h1>' + '<h1>Would you like to play agin?</h1><br>' + '<i style="font-size: 5rem;" class="blue far fa-thumbs-up"></i>' + '<br>' + '<button onclick = winReset()>Play Again</button>' + '</div>';
    console.log(overlay.parentElement);

    overlay.innerHTML = str;
    overlay.setAttribute("id", "overlay");
    overlay.setAttribute("class", "overlay");
    document.body.appendChild(overlay);
    const overlayContainer = document.querySelector('#congrats');
  }, 1000);
}

function winReset(){
  document.body.removeChild(overlay);
  reset();
}

function pointSystem(all,resetPressed,star){
if(all){
  firstStar.classList.toggle("fa");
  firstStar.classList.toggle("far");
  secoundStar.classList.toggle("fa");
  secoundStar.classList.toggle("far");
  thirdStar.classList.toggle("fa");
  thirdStar.classList.toggle("far");
} else if (resetPressed){

  firstStar.classList.add("fa");
  firstStar.classList.remove("far");
  secoundStar.classList.add("fa");
  secoundStar.classList.remove("far");
  thirdStar.classList.add("fa");
  thirdStar.classList.remove("far");
} else {
    star.classList.toggle("fa");
    star.classList.toggle("far");
  }
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

  //manipulates the dom to update the moves span number
  movesText = document.querySelector('#moves').textContent = counter;

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
      counter++;
      //creates letibles that hold the inner classes of the two cards clicked
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

//progresses a counter attached to the moves span

if (counter==15){
  pointSystem(false,false,firstStar);
  starRating--;
}
if (counter==20){
  pointSystem(false,false,secoundStar);
  starRating--;
}
if (counter==30){
  pointSystem(false,false,thirdStar);
  starRating--;
}


//adds eventlisteners to all of the cards
for (let i = 0; i < cards.length; i++) {
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
