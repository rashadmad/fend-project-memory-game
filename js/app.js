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
//stars
const firstStar = document.querySelector('#first');
const secoundStar = document.querySelector('#secound');
const thirdStar = document.querySelector('#third');
const fourthStar = document.querySelector('#fourth');
const fifthStar = document.querySelector('#fifth');
const clock = document.createElement("TIME");
const myScorePanel = document.querySelector('.score-panel');
const minHolder = document.createElement("span");
const secHolder = document.createElement("span");
let movesText = document.querySelector('#moves');
//stuff for the overlay
const overlayContainer = document.querySelector('#congrats');
const overlay = document.createElement("div");
const overlayHeader = document.createElement("h1").textContent = "Congratulations";
let overlayStr = "";

let movesCounter = 0;
let matchsMade = 0;
let starRating = 5;
let sec = 0;
let min = 0;
let myMin = minHolder.textContent;
let mySec = secHolder.textContent;

shufflesDeck()

resetButton.addEventListener('click', reset);

  function addSecounds(){

    sec++
    if (sec === 60) {
      sec = 0;
      min++
      console.log(min);
    }
    secHolder.textContent = " " + sec + " sec";
    minHolder.textContent = min + " min";
}

let myTimer = setInterval(addSecounds, 1000);

  myScorePanel.appendChild(clock).innerHTML = '<i style = "font-size: 1.2em; margin-left: 10px; margin-right: 5px" class = "far fa-clock"></i>';
  clock.appendChild(minHolder);
  clock.appendChild(secHolder);

function shufflesDeck(){
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

//shuffles the cards upon page load upon press of the reset button or on page load

  ///play agin button starts the game over agin
  function playAgin() {
    //resets timer
    sec = 0;
    min = 0;
    matchsMade = 0;
    starRating = 5;
    movesCounter = 0;
    movesText.textContent = movesCounter;
    myTimer = setInterval(addSecounds, 1000);
    overlayStr = "";
    document.body.removeChild(overlay);
    myMin = minHolder.textContent;
    mySec = secHolder.textContent;
    pointSystem(resetAll = true);
    shufflesDeck();
  }

function reset() {

  //stop timer
  clearInterval(myTimer);
  overlayStr = '<div id="congrats"><h1>Deck has been shuffled</h1><h1>also your time & star</h1><h1> score have been reset</h1><p>are you ready to play?</p><button style="cursor: pointer;" onclick = playAgin()>Play Again</button>' + '</div>';
  //starts timer back up
  secHolder.textContent = " " + 0 + " sec";
  minHolder.textContent = 0 + " min";
  movesText.textContent = movesCounter;
  document.body.appendChild(overlay);
  overlay.innerHTML = overlayStr;
  overlay.setAttribute("id", "overlay");
  overlay.setAttribute("class", "overlay");

}

function win() {
  //stop timer
  clearInterval(myTimer);
  myMin = minHolder.textContent;
  mySec = secHolder.textContent;

  setTimeout(function() {
    overlayStr = '<div id="congrats"><h1>Congratulations You win.</h1>' + '<h1>' + 'Here is your score.</h1>' + '<p style="font-size: 1.5rem;" class = "blue">It took you ' + minHolder.textContent + 'utes' + ' and ' + secHolder.textContent + 'ounds' + '</p>' + '<p style="font-size: 1.5rem;" class = "blue">to complete, your star rating is ' + starRating + '</p>' + '<p style="font-size: 1.5rem;" class = "blue"> it took you ' + movesCounter + ' moves to finsh</p>' + '<h1>Thank you for playing</h1>' + '<h1>Would you like to play agin?</h1><br><i style="font-size: 5rem;" class="blue far fa-thumbs-up"></i><br><button style="cursor: pointer;" onclick = playAgin()>Play Again</button></div>';
    document.body.appendChild(overlay);
    overlay.innerHTML = overlayStr;
    overlay.setAttribute("id", "overlay");
    overlay.setAttribute("class", "overlay");

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
  //manipulates the dom to update the moves span number
  movesText.textContent = movesCounter;
  const clicked = this.classList;
  //makeing matched cards not apply as eventlisteners
  if (clicked.contains("match") || clicked.contains("show")) {
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
      movesCounter++;
      //progresses a counter attached to the moves span

        if (movesCounter == 16) {
          pointSystem(false,firstStar);
          starRating--;
          console.log(starRating);
        } if (movesCounter == 26) {
          pointSystem(false,secoundStar);
          starRating--;
          console.log(starRating);
        } if (movesCounter == 30) {
          pointSystem(false,thirdStar);
          starRating--;
          console.log(starRating);
        } if (movesCounter == 36) {
          pointSystem(false,fourthStar);
          starRating--;
          console.log(starRating);
        } if (movesCounter == 40) {
          pointSystem(false,fifthStar);
          starRating--;
          console.log(starRating);
        }

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
  if (clicked.contains("show")){
    for (let i = 0; i < cards.length; i++) {
      cards[i].addEventListener('click', checkMatch, false);
    }
  }
}

function pointSystem(resetAll,star) {
  if (resetAll) {
    firstStar.classList.add("fa");
    firstStar.classList.remove("far");
    secoundStar.classList.add("fa");
    secoundStar.classList.remove("far");
    thirdStar.classList.add("fa");
    thirdStar.classList.remove("far");
    fourthStar.classList.add("fa");
    fourthStar.classList.remove("far");
    fifthStar.classList.add("fa");
    fifthStar.classList.remove("far");
  } else {
    star.classList.toggle("fa");
    star.classList.toggle("far");
  }
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
