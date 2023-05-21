var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern =[];
var isFirstKeyPress = true;
var level = 0;
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(nextSequence,1000);
            userClickedPattern=[];
        }
    }else{
        var over = new Audio("sounds/wrong.mp3");
        over.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200)
        $("h1").text("Game Over, Press Any Key to Restart");
        gameOver();
    }
}

function gameOver(){
    isFirstKeyPress = true;
    gamePattern =[];
    userClickedPattern=[];
    level = 0;
}

function nextSequence(){
    level++;
    $("h1").text("level "+ level);
    var randomNumber = Math.floor(Math.random()*4)
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
}

function playSound(name){
    var sound = new Audio("sounds/"+name+ ".mp3");
    sound.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }


$(".btn").on("click", function() {
    var $btn = $(this);
    playSound($btn.attr("id"));
    animatePress($btn.attr("id"));
    userClickedPattern.push($btn.attr("id")); 
    checkAnswer(userClickedPattern.length - 1);
});


$(document).keypress(function(){
    if(isFirstKeyPress){
        nextSequence();
        isFirstKeyPress = false;
    }
});