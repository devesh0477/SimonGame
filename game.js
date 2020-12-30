

var buttonColours = ["red", "blue", "green", "yellow"]; 
var gamePattern = [];
var userClickedPattern = [];



var started = false;

var level = 0;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level:-" + " " + level);
    var randomNumber = Math.floor(Math.random() * 4); 
    var randomChosenColour = buttonColours[randomNumber]; 
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

$(".btn").click(function(){
    var userChosenColour = this.id; 
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern.length);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  });

  function playSound(name){
    var audio = new Audio( "sounds/" + name + ".mp3");
    audio.play();
  }

  function animatePress(currentColour) {
   var self = $("#" + currentColour).addClass("pressed");

   setTimeout(function(){
    self.removeClass("pressed");
}, 100);
  }

  function checkAnswer(currentLevel){
   if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
       console.log("sucess");
    if (userClickedPattern.length === gamePattern.length) {
    setTimeout(doSomething, 1000);
    function doSomething() {
       nextSequence();
    }
  }
}
  else {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

$("h1").text("Game Over, Press Any Key to Restart");
startOver()
  }
}

function startOver() {
level = 0; 
gamePattern = [];
started = false;
}