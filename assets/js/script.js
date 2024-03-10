let frame1 = document.getElementById("frame1");
let frame2 = document.getElementById("frame2");
let frame3 = document.getElementById("frame3");

document.getElementsByClassName("hide").style.display = "none";

frame2.classList.add("hide");
frame3.classList.add("hide");

var currentCoin = 0;
var userAnswer = null;
var score = 0;
var time = 5;
var maxTime;
var totalTime;

var challenges;

// ____________________________________________________ start ____________________________________________________ //

function startGame() {

    frame3.classList.add("hide");
    this.currentCoin = 0;
    this.userAnswer = null;
    this.score = 0;
    this.time = 5;
    this.maxTime = time;
    this.totalTime = time;

    frame1.classList.add("hide");
    frame2.classList.remove("hide");

    challenges = generateMathProblem(); 
    countdown();
    document.getElementById("problem").textContent = challenges.question;
    document.getElementById("result").textContent = " = ? ";

}

// ____________________________________________________ option answer ____________________________________________________ //

function check() {


    let corretAnswer = challenges.answer;
    
    if(score < 0) {
        gameover();
    }

    if(userAnswer != null) {

        if(userAnswer == corretAnswer) {
            if(score == 0) { score = 1; } else { score++; }
            this.time += (maxTime-this.time);
            
            currentCoin += score*20;

        } else {
            //currentCoin -= score*50;
            userAnswer = null;
            this.time--;
        }

        document.getElementById("currentCoin").textContent = currentCoin;
        userAnswer = null;
        challenges = generateMathProblem();

    } else {
        alert("Please, select an option");
        return;
    }

}

// ____________________________________________________ option answer ____________________________________________________ //

function optAnswer(btn) {
    userAnswer = btn.textContent;
    document.getElementById("problem").textContent = challenges.question;
    document.getElementById("result").textContent = " = "+userAnswer;
}


// ____________________________________________________ Genereted math problem ____________________________________________________ //

function generateMathProblem() {

    const operators = ['+', '-', '*', '/'];
    const operand1 = Math.floor(Math.random() * 10) + 1;
    const operand2 = Math.floor(Math.random() * 10) + 1;
    const operator = operators[Math.floor(Math.random() * operators.length)];
    const question = `${operand1} ${operator} ${operand2}`;
    let answer;

    switch (operator) {
        case '+':
            answer = operand1 + operand2;
            break;
        case '-':
            answer = operand1 - operand2;
            break;
        case '*':
            answer = operand1 * operand2;
            break;
        case '/':
            answer = operand1 / operand2;
            break;
    }

    if(answer % 1 !== 0) {
        //answer = answer.toFixed(2);
        return generateMathProblem();
        
    }        

    const options = [];
    options.push(answer);

    for (let i = 0; i < 5; i++) {
        let option;
        do {
            option = Math.floor(Math.random() * 20) + 1;
        } while (options.includes(option));
        options.push(option);
    }

    options.sort(() => Math.random() - 0.5);
    
    // show options on screen
    document.getElementById("btn1").innerHTML = (options[0]);
    document.getElementById("btn2").innerHTML = (options[1]);
    document.getElementById("btn3").innerHTML = (options[2]);
    document.getElementById("btn4").innerHTML = (options[3]);
    document.getElementById("btn5").innerHTML = (options[4]);
    document.getElementById("btn6").innerHTML = (options[5]);
    document.getElementById("problem").textContent = question;
    document.getElementById("result").textContent = " = ? ";
    document.getElementById("currentCoin").textContent = currentCoin;

    return { question, answer, options };
}

// ____________________________________________________ Countdown ____________________________________________________ //

function countdown() {
    document.getElementById("clock").textContent = this.time;

    totalTime += this.time; 
  
    document.getElementById("clock").textContent = this.time;

    if (this.time <= 0) {
        return gameover();
    } else {
        this.time--;
        setTimeout(countdown, 1000);
    }
}

function gameover() {
    document.getElementById("frame2").classList.add("hide");
    document.getElementById("frame3").classList.remove("hide");
    document.getElementsByClassName("btn-start").textContent = "Restart";
    document.getElementById("final_score").textContent = "Score: "+score;
    document.getElementById("final_currentCoin").textContent = "Coins: "+currentCoin+"c";

    score = null;
    totalTime = null;
    this.time = null;
    maxTime = null;
    currentCoin = null;
    return;
}
