var userClickedPattern=[];
var level=0;
var started = false;
var gamePattern=[];
var buttonColours=['green','red','yellow','blue'];

function startOver(){
    var userClickedPattern=[];
    var level=0;
    var started = false;
}

$(document).keypress(function(){
    if(!started){
        $("h1").text("level "+level);
       nextSequence();
       started=true;
    }
})

// adding next sequence
function nextSequence(){
    userClickedPattern=[];
    level=level+1;
    $("h1").text("level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// playing sounds in the game
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

// showing animations
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100)

}

// checking if sequence is correct or not
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
                 setTimeout(function(){
                    nextSequence();
                 },1000);
        }
    }
    else{
        gameOver();
    }
           
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

// gameover
function gameOver(){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over Press Any key to restart");
    startOver();
}