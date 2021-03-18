//Variables comunes

var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started=false;
var gameOver=false;
var level=0;
//Funciones



$(".btn").click(function(evt){
    if(!gameOver){
        var userChosenColour=evt.target.id;
        console.log(userChosenColour);
        userClickedPattern.push(userChosenColour);
        playSound("./sounds/"+userChosenColour+".mp3")
        animatePress(userChosenColour);
        compareSequence(userClickedPattern.length-1);}
})

function nextSequence() {
    level++;
    $("#level-title").text("LEVEL "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];//guardo el color
    console.log("nuevo"+randomChosenColour);
    gamePattern.push(randomChosenColour);//introduzco el color en el array
    showPattern(0);
}

function showPattern(index){
    if(index!=gamePattern.length){
        var aux=$("#"+gamePattern[index]);
        aux.fadeIn(1000).fadeOut(100).fadeIn(100);
        playSound("./sounds/"+gamePattern[index]+".mp3");
        setTimeout(function (){showPattern(index+1)},800); }
}

function playSound(name){
    var audioAux= new Audio(name);
    audioAux.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){ $("#"+currentColour).removeClass("pressed"); }, 100);
}

function  compareSequence(index){

    if(index==(gamePattern.length-1) && gamePattern[index]==userClickedPattern[index]){
        userClickedPattern=[];
        setTimeout(nextSequence,1000);
    }
    else{
        if(gamePattern[index]!=userClickedPattern[index]){
            $("body").addClass("game-over");
            setTimeout(function(){ $("body").removeClass("game-over"); }, 500);
            gameOver=true;
            $("#level-title").text("GAME OVER PRESS A to restart");
            userClickedPattern=[];
            gamePattern=[];
            started=false;

        }
    }

}

$(document).on("keypress",function(evt){

    if((evt.key=='a' || evt.key=='A') && !started){
        if(gameOver)
            gameOver=false;
        started=true;
        $("#level-title").text("LEVEL 0");
        nextSequence();
    }
}
);





//Main




