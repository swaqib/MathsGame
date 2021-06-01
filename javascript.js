var playing=false;
var score;
var action;
var timeRemaining;
var correctAnswer;
var triesValue = 3;


//If we click on Start/Reset button
document.getElementById("startreset").onclick=function(){
    //If we are playing
    if(playing==true){
        //reload page
        location.reload();
    }
    //If we are not playing
    else{
        //change mode to "playing"
        playing=true;

        //Set score to 0
        score=0;
        document.getElementById("scorevalue").innerHTML=score;

        //Show countdown box
        show("timeremaining");
        timeRemaining=60;
        document.getElementById("timeremainingvalue").innerHTML=timeRemaining;

        //hide game over box
        hide("gameOver");

        //change button to reset
        document.getElementById("startreset").innerHTML="Reset Game";
        
        //reduce time by 1sec in loop
        startCountdown();
        
        //generate new Q&A
        generateQA();
    }  
}


    
for(i=1; i<5; i++){
    //If we click on answer box
    document.getElementById("box"+i).onclick=function(){
        //If we are playing
        if(playing==true){//Yes
            if(this.innerHTML==correctAnswer){//Correct?
                //increase score by 1
                score++;
                document.getElementById("scorevalue").innerHTML=score;

                //show correct box for 1 sec
                hide("wrong");
                show("correct");
                setTimeout(function(){hide("correct");}, 1000);

                //generate new Q&A
                generateQA();
            }
            else{//wrong?
                //show wrong box for 1 sec
                hide("correct");
                show("wrong");
                setTimeout(function(){hide("wrong");}, 1000);

                //reduce life remaining
                triesValue-=1;
                document.getElementById("triesvalue").innerHTML=triesValue;

                //check if life is >0
                lifeOver(triesValue);
            }
        }
    }
}

//functions
//start counter
function startCountdown(){
    action=setInterval(function(){
        //reduce time by 1sec in loop
        timeRemaining-=1;
        document.getElementById("timeremainingvalue").innerHTML=timeRemaining;
        
        //check remaining time
        if(timeRemaining==0){ 
            //game over
            stopCountdown();
            show("gameOver");
            document.getElementById("gameOver").innerHTML="<p>Game Over!</p><p>Your score is " + score + ". </p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing==false;
            document.getElementById("startreset").innerHTML="Start Game";
        }
    },1000);
}

//stop counter
function stopCountdown(){
    clearInterval(action);
}

//hide element
function hide(Id){
    document.getElementById(Id).style.display="none";
}


//show element
function show(Id){
    document.getElementById(Id).style.display="block";
}

//generate Q&A
function generateQA(){

    //get value between 1-10
    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(9*Math.random());
    correctAnswer = x*y;

    //generate question
    document.getElementById("question").innerHTML= x + "x" + y;

    //choose a box and place correct answer
    var correctPosition = 1 + Math.round(3*Math.random());
    document.getElementById("box"+correctPosition).innerHTML=correctAnswer;
    
    //create an array with index 0 is the correct answer
    var answers=[correctAnswer];
    
    //fill other boxes with wrong answer
    for(i=1; i<5; i++){

        //check box is the correct answer or not
        if(i!=correctPosition){
            var wrongAnswer;

            //generate wrong answer
            do{
                wrongAnswer = (1 + Math.round(9*Math.random()))*(1 + Math.round(9*Math.random()));

                //put wrong answer in the box
                document.getElementById("box"+i).innerHTML=wrongAnswer;
            }
            while(answers.indexOf(wrongAnswer)>-1){
                document.getElementById("box"+i).innerHTML=wrongAnswer;
                
                //fill array with wrong answer to avoid duplicates
                answers.push(wrongAnswer);
            }
        }
    }
}

//check life remaining
function lifeOver(v){
    if(v==0){
        show("gameOver");
            document.getElementById("gameOver").innerHTML="<p>Game Over!</p><p>Your score is " + score + ". </p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing==false;
            document.getElementById("startreset").innerHTML="Start Game";
    }
}