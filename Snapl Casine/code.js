var balance = 500;
var betAmount;
var winner;
var playerCount;
var dealerCount;
var roulettenum;
var roulettecolor;
var playerBet;

refresh(balance);
setText("label7", " ");
setText("titleBalance", "Balance: " + balance);
onEvent("button13", "click", function ( ){
  setScreen("titleScreen");
  refresh(balance, winner);
});

onEvent("button2", "click", function( ){
  betAmount = getNumber("text_input2");
  if(betAmount <= 0 || betAmount > balance){
    console.log("Not a valid Bet! You're betting 1.");
    betAmount = 1;
  }
  setScreen("roulette");
});

onEvent("red", "click", function( ){
  playerBet = "red";
  roulette();
});

onEvent("black", "click", function( ){
  playerBet = "black";
  roulette();
});

onEvent("green", "click", function( ){
  playerBet = "green";
  roulette();
});

onEvent("odds", "click", function( ){
  playerBet = "odds";
  roulette();
});

onEvent("evens", "click", function( ){
  playerBet = "evens";
  roulette();
});

onEvent("numbet1", "click", function( ){
  playerBet = "1-12";
  roulette();
});

onEvent("numbet2", "click", function( ){
  playerBet = "13-24";
  roulette();
});

onEvent("numbet3", "click", function( ){
  playerBet = "25-36";
  roulette();
});

onEvent("zero", "click", function( ){
  playerBet = "0";
  roulette();
});

onEvent("button1", "click", function( ) {
  betAmount = getNumber("text_input2");
  if(betAmount <= 0 || betAmount > balance){
    console.log("Not a valid Bet! You're betting 1.");
    betAmount = 1;
  }
  setScreen("blackjack");
});

onEvent("hit", "click", function( ){
  blackjack(playerCount, dealerCount, winner);
  
});
onEvent("stand", "click", function( ){
  stand();
});

onEvent("button3", "click", function( ){
  setText("label3", "You left with " + String(balance) + " remaining...");
  setScreen("screen1");
});

function refresh(balance, winner){
  setText("titleBalance", "Balance: " + balance);
  setText("label7", String(winner));
  setText("text_input2", " ");
  setScreen("titleScreen");
  setText("dealercount", "0");
  setText("playerCount", "0");
  roulettenum = 0;
  roulettecolor = 0;
  if(balance <= 0){
    setText("label3", "You left with " + String(balance) + " remaining...");
    setScreen("screen1");
  }
}

function roulette(){
  roulettenum = randomNumber(1, 37);
  roulettecolor = randomNumber(1,10);
  if(playerBet == "red"){
    winner = "You Lost!";
    if(roulettecolor > 5 && roulettecolor <= 9){
      winner = "You Won!";
    }
  }
  else if(playerBet == "black"){
    winner = "You Lost!";
    if(roulettecolor < 5){
      winner = "You Won!";
    }
  }
  else if(playerBet == "green"){
    winner = "You Lost!";
    if(roulettecolor == 10){
      winner = "You Won!";
    }
  }
  else if(playerBet == "1-12"){
    winner = "You Lost!";
    if(roulettenum <= 12){
      winner = "You Won!";
    }
  }
  else if(playerBet == "13-24"){
    winner = "You Lost!";
    if(roulettenum <= 24 && roulettenum >= 13){
      winner = "You Won!";
    }
  }
  else if(playerBet == "25-36"){
    winner = "You Lost!";
    if(roulettenum <= 36 && roulettenum >= 25){
      winner = "You Won!";
    }
  }
  else if(playerBet == "0"){
    winner = "You Lost!";
    if(roulettenum == 37){
      winner = "You Won!";
    }
  }
  else if(playerBet == "evens"){
    winner = "You Lost!";
    if(roulettenum % 2 === 0){
      winner = "You Won!";
    }
  }
  else if(playerBet == "odds"){
    winner = "You Lost!";
    if(roulettenum % 2 === 1){
      winner = "You Won!";
    }
  }
  setText("rouletteresults", String(winner));
  setProperty("resultsText", "text", roulettenum);
  if(roulettecolor > 5 && roulettecolor < 9){
  setProperty("resultsText", "background-color", "red");
  setProperty("resultsText", "text-color","black");
  }
  else if(roulettecolor <= 5){
  setProperty("resultsText", "background-color", "black");
  setProperty("resultsText", "text-color","white");
  }
  else if(roulettecolor == 10){
  setProperty("resultsText", "background-color", "green");
  setProperty("resultsText", "text-color","black");
  }
  if(winner == "You Won!"){
    balance = balance + betAmount;
  }
  else{
    balance = balance - betAmount;
  }
  setScreen("results");
}

function blackjack(){
  if(playerCount && dealerCount == 0){
  playerCount = randomNumber(1, 12);
  dealerCount = randomNumber(1,12);
  
  setText("playerCount", playerCount);
  setText("dealercount", dealerCount);
  }
  else{
  playerCount = getNumber("playerCount");
  dealerCount = getNumber("dealercount");
  
  playerCount = playerCount + randomNumber(1,12);
  setText("playerCount", playerCount);
  if(dealerCount < 17){
  dealerCount = dealerCount + randomNumber(1,12);
  setText("dealercount", dealerCount);
  }
  check(playerCount, dealerCount, winner);
  }
}
function check(playerCount, dealerCount, winner){
  if(playerCount == 21){
    winner = "You got a blackjack!";
    balance = balance + betAmount;
    refresh(balance, winner);
  } 
  else if(dealerCount == 21){
    winner = "Dealer blackjack!";
    balance = balance - betAmount;
    refresh(balance, winner);
  }
  else if(playerCount > 21){
    winner = "You overdrew!";
    balance = balance - betAmount;
    refresh(balance, winner);
  }
  else if(dealerCount > 21){
    winner = "Dealer overdrew!";
    balance = balance + betAmount;
    refresh(balance, winner);
  }
  else{
  }
}

function stand(){
  while(dealerCount < 16){
    dealerCount = dealerCount + randomNumber(1,12);
    setText("dealercount", dealerCount);
    check();
  }
  var counter = playerCount;
  var counter2 = dealerCount;
  var loops = 0;
  while(counter <= 21){
    counter++;
    loops++;
  }
  var loops2 = 0;
  while(counter2 <= 21){
    counter2++;
    loops2++;
  }
  if(loops < loops2){
    winner = "You won!";
    counter = 0;
    counter2 = 0;
    balance = balance + betAmount;
    refresh(balance, winner);
  }
  else if(loops2 < loops){
    winner = "Dealer Wins!";
    counter = 0;
    counter2 = 0;
    balance = balance - betAmount;
    refresh(balance, winner);
  }
  else if(loops == loops2){
    winner = "Tie!";
    counter = 0;
    counter2 = 0;
    refresh(balance, winner);
  }
  
}