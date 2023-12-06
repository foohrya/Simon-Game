var buttonColours = ["green","red","yellow","blue"];
var userClickedPattern = [];
var gamePattern = [];
var level = 0;
var started = false;


$(document).on("keypress",function(){
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").on("click",function(){
    //var userChosenColour = this.getAttribute("id");
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length===gamePattern.length){
      setTimeout(function (){
        nextSequence();
      },1000);
    }
  }
  else {
    playSound("wrong")
    $("body").addClass("game-over");
    setTimeout(function() {
    $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart")
    startOver();
  }
  }



function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
    level++;
    $("h1").text("Level "+level);
  }



  function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play(); 
  }


  function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
      $("#"+currentColor).removeClass("pressed");
    },100);
  }

  
  function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
  }


