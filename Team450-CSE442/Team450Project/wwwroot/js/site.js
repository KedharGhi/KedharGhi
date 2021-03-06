﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.
var currentID = null;
let timerHTML = document.getElementById("timerHTML"),
    sec = 0, min = 10,
    t;
var scoreBoard = document.getElementById('score');
var currentScore = 0;
var gameActive = false;
var stateCount = 0;
let userInput = document.getElementById("input_textbox");


var date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();

if (month < 10) month = "0" + month;
if (day < 10) day = "0" + day;

var today = year + "-" + month + "-" + day;
var getTheDate = document.getElementById('theDate');

if (getTheDate) { //I dont know how we needed this if statement to fix the null value  problem.
    getTheDate.value = today;
};



// Starts the game after hitting the start button
function startGame() {
    // Submit answer when user presses enter
    userInput.addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            // Trigger the button element with a click
            document.getElementById("submit_button").click();
        }
    });
    // Exit module when user presses escape
    document.addEventListener("keyup", function (event) {
        if (event.key == "Escape") {
            // Trigger the button element with a click
            document.getElementById("back_button").click();
        }
    });

    document.getElementById("pre_game_module").style = "display: none;"; // Hide pre-game screen
    gameActive = true;
    timer();
}

// Starts the game after hitting the start button
function startStudying() {
    // Execute a function when the user releases a key on the keyboard
    userInput.addEventListener("keyup", function (event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            document.getElementById("submit_button").click();
        }
    });

    document.getElementById("pre_game_module").style = "display: none;"; // Hide pre-game screen
    gameActive = true;

}



// Opens the pop up box to answer question(s) about the state
function openStatesModule(id) {

    // Grab the module element
    let module = document.getElementById("state_module");

    // Grab the user input element and the corresponding state
    let state = document.getElementById(id);

    // If the module is already showing for another state, end function
    if (module.style.display == "inline-block" || state.getAttribute("active") != "1" || !gameActive) return;

    currentID = id; // Update the id variable to the current selected state id

    // Open Module by setting the display to inline-block and fill the state with yellow to indicate user action
    module.style.display = "inline-block";
    state.style.fill = "yellow";

    //Place cursor in text box
    userInput.select();

    // Load image of corresponding state
    let img = document.getElementById("state_image");
    let stateName = state.getAttribute("state-name").toLowerCase();
    let imgSrc = "/images/" + stateName.replace(" ", "-") + ".jpg";
    img.setAttribute("src", imgSrc);

    // Set user input to empty string
    userInput.value = "";
}

function openStatesStudying(id) {

    // Grab the module element
    let module = document.getElementById("state_module");
    // Grab the user input element and the corresponding state
    let state = document.getElementById(id);

    // If the module is already showing for another state, end function
    if (module.style.display == "inline-block" || state.getAttribute("active") != "1" || !gameActive) return;

    document.getElementById("state_name").childNodes[1].innerHTML = document.getElementById(id).getAttribute("state-name");

    currentID = id; // Update the id variable to the current selected state id

    // Open Module by setting the display to inline-block and fill the state with yellow to indicate user action
    module.style.display = "inline-block";
    state.style.fill = "yellow";

    // Load image of corresponding state
    let img = document.getElementById("state_image");
    let stateName = state.getAttribute("state-name").toLowerCase();
    let imgSrc = "/images/" + stateName.replace(" ", "-") + ".jpg";
    img.setAttribute("src", imgSrc);

    // Set user input to empty string
    userInput.value = "";
}

function openCapitalModule(id) {

    // Grab the module element
    let module = document.getElementById("state_module");

    // Grab the user input element and the corresponding state
    let state = document.getElementById(id);

    // If the module is already showing for another state, end function
    if (module.style.display == "inline-block" || state.getAttribute("active") != "1" || !gameActive) return;

    currentID = id; // Update the id variable to the current selected state id

    // Open Module by setting the display to inline-block and fill the state with yellow to indicate user action
    module.style.display = "inline-block";
    state.style.fill = "yellow";

    //Place cursor in text box
    userInput.select();

    // Load image of corresponding state
    let img = document.getElementById("state_image");
    let stateName = state.getAttribute("state-name").toLowerCase();
    let imgSrc = "/images/" + stateName.replace(" ", "-") + ".jpg";
    img.setAttribute("src", imgSrc);

    // Set user input to empty string
    userInput.value = "";
}

function openCapitalsStudying(id) {

    // Grab the module element
    let module = document.getElementById("state_module");
    // Grab the user input element and the corresponding state
    let state = document.getElementById(id);

    // If the module is already showing for another state, end function
    if (module.style.display == "inline-block" || state.getAttribute("active") != "1" || !gameActive) return;

    document.getElementById("capital_name").childNodes[1].innerHTML = document.getElementById(id).getAttribute("state-capital");

    currentID = id; // Update the id variable to the current selected state id

    // Open Module by setting the display to inline-block and fill the state with yellow to indicate user action
    module.style.display = "inline-block";
    state.style.fill = "yellow";

    // Load image of corresponding state
    let img = document.getElementById("state_image");
    let stateName = state.getAttribute("state-name").toLowerCase();
    let imgSrc = "/images/" + stateName.replace(" ", "-") + ".jpg";
    img.setAttribute("src", imgSrc);

    // Set user input to empty string
    userInput.value = "";
}

// Closes the pop up box
function exitModule() {
    // Grab the module element
    let module = document.getElementById("state_module");

    // Grab state element
    let state = document.getElementById(currentID);

    // Set display to none and reset the state color to gray
    module.style.display = "none";
    state.style.fill = "#d3d3d3";
}

// Submits the current user input and validates the answer
function submitStatesModule() {

    // Grab the module, user input value, tries element and current state
    let module = document.getElementById("state_module");

    let userInput = document.getElementById("input_textbox").value;

    let state = document.getElementById(currentID);

    // Compares the user input and the state name to check for correctness (not case sensitive)
    if (userInput.toLowerCase() != state.getAttribute("state-name").toLowerCase()) {
        state.style.fill = "red";
        currentScore -= 2;
    }
    else {
        // If the user was correct, exit the module and turn the state green 
        state.style.fill = "green";
        currentScore += 5;
    }

    module.style.display = "none";
    updateScore();
    stateCount++;

    if (stateCount == 50) {
        gameOver();
    }

    state.setAttribute("active", "0");
}

// Submits the current user input and validates the answer
function submitCapitalModule() {

    // Grab the module, user input value, tries element and current state
    let module = document.getElementById("state_module");

    let userInput = document.getElementById("input_textbox").value;

    let state = document.getElementById(currentID);

    // Compares the user input and the state name to check for correctness (not case sensitive)
    if (userInput.toLowerCase() != state.getAttribute("state-capital").toLowerCase()) {
        state.style.fill = "red";
        currentScore -= 2;
    }
    else {
        // If the user was correct, exit the module, turn the state green and reset the tries_left variable to 3
        state.style.fill = "green";
        currentScore += 5;
    }

    module.style.display = "none";
    updateScore();
    stateCount++;

    if (stateCount == 50) {
        gameOver();
    }

    state.setAttribute("active", "0");
}


// Activates the GAME OVER state.
function gameOver() {
    let module = document.getElementById("gameover_module");
    let finalSB = document.getElementById("final_score");
    //If score<0 make final score = 0
    let sign = 1;
    if (currentScore < 0) sign = 0;
    let finalScore = (currentScore + Math.floor(((min * 60) + sec) / 5)) * sign;

    var testscores = document.getElementById("scores");
    var completiontime = document.getElementById("CompletionTime");

    let timeSB = document.getElementById("completion_time");
    let finalMin = 10;
    let finalSec = 0;

    if (sec > 0) {
        finalMin--;
        finalSec = 60;
    }
    finalMin -= min;
    finalSec -= sec;

    module.style.display = "inline-block";
    finalSB.innerHTML = "Your final score is: " + finalScore;

    if (min <= 0 && sec <= 0) {
        timeSB.innerHTML = "You ran out of time!";
        completiontime.value = "10:00";
    }
    else {
        timeSB.innerHTML = "Completed in: " + finalMin + " minute(s) and " + finalSec + " second(s)!";
        completiontime.value = finalMin+":"+finalSec;
    }
    testscores.value = finalScore;
    
}

//Opens module to let user enter score into leaderboard
function openScore() {
    let module = document.getElementById("enter_score_module");
    module.style = "display: inline-block;";
}

//Adds score to leaderboard
function submitScore() {
    let module = document.getElementById("enter_score_module");
    let input = module.childNodes[1].value;
    module.style = "display: none;";
}

// Function that increments and displays time.
function add() {

    // Increments time, resets sec, min, etc. when corresponding counter reaches >= 60.

    sec--;   

    if (sec < 0) {
        sec = 59;
        min--;
    }

    // Displays time.
    timerHTML.textContent = (min ? (min > 9 ? min : "0" + min) : "00") + ":" + (sec > 9 ? sec : "0" + sec);

    timer();
}

// Applies add() function to timer.
function timer() {
    if ((min <= 0 && sec <= 0) || stateCount == 50) {
        gameOver();
    }
    else {
        t = setTimeout(add, 1000);
    }
}

function updateScore() {
    var scoreBoard1 = "Score: " + currentScore;
    if (scoreBoard) {   //Need this statement to fix the Console cannot set null error.
        scoreBoard.innerHTML = scoreBoard1;
    }
}

updateScore();