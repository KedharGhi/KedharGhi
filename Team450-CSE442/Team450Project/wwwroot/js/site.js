﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.
let currentID = null;
var timerHTML = document.getElementById("timerHTML"),
    sec = 0, min = 10,
    t;
let scoreBoard = document.getElementById('score');
let currentScore = 0;

// Opens the pop up box to answer question(s) about the state
function openModule(id) {

    // Grab the module element
    let module = document.getElementById("state_module");

    // Grab the user input element and the corresponding state
    let userInput = document.getElementById("input_textbox");
    let state = document.getElementById(id);

    // If the module is already showing for another state, end function
    if (module.style.display == "inline-block" || state.getAttribute("active") != "1") return;

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
function submitModule() {

    // Grab the module, user input value, tries element and current state
    let module = document.getElementById("state_module");

    let userInput = document.getElementById("input_textbox").value;

    let state = document.getElementById(currentID);

    console.log(userInput.toLowerCase());
    console.log(state.getAttribute("state-name").toLowerCase());

    // Compares the user input and the state name to check for correctness (not case sensitive)
    if (userInput.toLowerCase() != state.getAttribute("state-name").toLowerCase()) {
        module.style.display = "none";
        state.style.fill = "red";
    }
    else {
        // If the user was correct, exit the module, turn the state green and reset the tries_left variable to 3
        module.style.display = "none";
        state.style.fill = "green";
        currentScore++;
        updateScore();
    }
    state.setAttribute("active", "0");
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
    timerHTML.textContent = (min ? (min > 9 ? min : "0" + min) : "10") + ":" + (sec > 9 ? sec : "0" + sec);

    timer();
}

// Applies add() function to timer.
function timer() {
    t = setTimeout(add, 1000);
}

timer();

function updateScore() {
    scoreBoard.innerHTML = "Score: " + currentScore;
}

updateScore();