/*
    Name: Matt Jirik
    Date Created: 11/7/18
    Most recent revision: 11/7/18
*/
function clearErrors() {    
    for (var loopCounter = 0; 
        loopCounter < document.forms["bet"].elements.length; 
        loopCounter++) {
        if (document.forms["bet"].elements[loopCounter]
           .parentElement.className.indexOf("has-") != -1) {
            
            document.forms["bet"].elements[loopCounter]
               .parentElement.className = "form-group";
        }
    }    
} 

function resetForm() {
    clearErrors();
    document.forms["bet"]["betInput"].value = "";
    document.getElementById("results").style.display = "none";
    document.getElementById("resultsHead").style.display = "none";
    document.getElementById("resetButton").style.display = "none";
    document.getElementById("submitButton").style.display = "block";
    document.forms["bet"]["betInput"].focus();
    rolls = 0;
    highest = 0.00;
    highestRoll = 0;
}

function rollDice() {
    var die1 = Math.floor(Math.random() * 6);
    var die2 = Math.floor(Math.random() * 6);
    return die1 + die2;
}

var rolls = 0;
var highest = 0.00;
var highestRoll = 0;

function gamble(bet) {
    highest = bet;
    while (bet > 0) {
        var result = rollDice();
        rolls++;
        if (result == 7) {
            bet += 4;
            if (bet > highest) {
                highest = bet;
                highestRoll = rolls;
            }
        } else {
            bet -= 1;
        }
    }
}

function validateItems() {
    clearErrors();
    var betInput = document.forms["bet"]["betInput"].value;
    if (betInput == "" || isNaN(betInput)) {
        alert("betInput must be filled in with a number.");
        document.forms["bet"]["betInput"]
            .parentElement.className = "form-group has-error";
        document.forms["bet"]["betInput"].focus();
        return false;
    }

    gamble(betInput);

    document.getElementById("resultsHead").style.display = "block";
    document.getElementById("results").style.display = "block";
    document.getElementById("resetButton").style.display = "inline";
    document.getElementById("resetButton").innerText = "Play Again";
    document.getElementById("submitButton").style.display = "none";
    document.getElementById("betResult").innerText = betInput;
    document.getElementById("rollsResult").innerText = rolls;
    document.getElementById("highestResult").innerText = highest;
    document.getElementById("highestRollResult").innerText = highestRoll;
    // We are returning false so that the form doesn't submit 
    // and so that we can see the results
    return false;
}
