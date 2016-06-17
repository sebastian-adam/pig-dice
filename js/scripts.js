// BACKEND
function Rolls() {
  this.roll = 0;
  this.game = 0;
}

Rolls.prototype.turnSum = function(x) {
  return this.roll += x;
}

Rolls.prototype.gameSum = function(x) {
  return this.game += x;
}

var diceRoll = function() {
  return Math.floor((Math.random()*6)+1);
}


// FRONTEND
$(function() {
  var turnController = true;
  var playerOne = new Rolls ();
  var playerTwo = new Rolls ();
  var turnTotal = 0;
  $(".player").text("P1 GO!");

  $("#roll").click(function(event){
    event.preventDefault();
    document.getElementById("hold").disabled = false;
    if (turnController === true) {
      $(".player").text("P1 GO!");
      var thisRoll = diceRoll();
      console.log(thisRoll);
      $("#rollScore").text(thisRoll);
      turnTotal = playerOne.turnSum(thisRoll);
      console.log(turnTotal);
      $("#turnScore").text(turnTotal);
      if (thisRoll === 1) {
        turnTotal = 0;
        $("#turnScore").text("BUSTED");
        $(".player").text("P2 GO!");
        document.getElementById("hold").disabled = true;
        return turnController = false;
      }
      return turnTotal;
    } else {
      $(".player").text("P2 GO!");
      var thisRoll = diceRoll();
      console.log(thisRoll);
      $("#rollScore").text(thisRoll);
      turnTotal = playerTwo.turnSum(thisRoll);
      console.log(turnTotal);
      $("#turnScore").text(turnTotal);
      if (thisRoll === 1) {
        turnTotal = 0;
        $("#turnScore").text("BUSTED");
        $(".player").text("P1 GO!");
        document.getElementById("hold").disabled = true;
        return turnController = true;
      }
      return turnTotal;
    }
  });

  $("#hold").click(function(event){
    event.preventDefault();
    if (turnController === true) {
      $("#runningScoreP1").text(playerOne.gameSum(turnTotal));
      $("#rollScore").text('');
      $("#turnScore").text('');
      playerOne.roll = 0;
      turnTotal = 0;
      if (playerOne.gameSum(turnTotal)>=100) {
        alert("P1 wins")
      }
      $(".player").text("P2 GO!");
      return turnController = false;
    } else {
      $("#runningScoreP2").text(playerTwo.gameSum(turnTotal));
      $("#rollScore").text('');
      $("#turnScore").text('');
      playerTwo.roll = 0;
      turnTotal = 0;
      if (playerTwo.gameSum(turnTotal)>=100) {
        alert("P2 wins")
      }
      $(".player").text("P1 GO!");
      return turnController = true;
    }
  });

});
