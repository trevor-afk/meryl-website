

// WHETHER THE GAME IS RUNNING OR NOT
var isRunning = false;
var currentLevel = [];
var levelNum = 0;
// GAME BUTTONS
var greenButton = document.getElementsByClassName("button-green")[0];
var redButton = document.getElementsByClassName("button-red")[0];
var yellowButton = document.getElementsByClassName("button-yellow")[0];
var blueButton = document.getElementsByClassName("button-blue")[0];

// LEVEL TITLE
var levelTitle = $("level-title");

// LEVEL OBJECT
function Level(levelNumber, numberOfMemorizations) {
  this.levelNumber = levelNumber;
  this.numberOfMemorizations = numberOfMemorizations;
}

// CHANGE BACKGROUND OF BUTTON WHEN CLICKED
function changeBackground(color) {
  switch (color) {
    case "green":
      greenButton.style.backgroundColor = "#003E00";
      setTimeout(function() {
        greenButton.style.backgroundColor = "green";
      }, 100);
      break;
    case "red":
      redButton.style.backgroundColor = "#A00000";
      setTimeout(function() {
        redButton.style.backgroundColor = "red";
      }, 100);
      break;
    case "yellow":
      yellowButton.style.backgroundColor = "#A0A000";
      setTimeout(function() {
        yellowButton.style.backgroundColor = "yellow";
      }, 100);
      break;
    case "blue":
      blueButton.style.backgroundColor = "#0000A0";
      setTimeout(function() {
        blueButton.style.backgroundColor = "blue";
      }, 100);
      break;
  }
}

// START GAME EVENT LISTENER
document.addEventListener("keydown", function(event) {
  if (event.keyCode == 32 && !isRunning) {
    $(".start-game-text").addClass("invisible");
    startGame();
  }

});

// ACTIVATES CLICK LISTENERS FOR LEVELS
function activateOnClicks() {
  greenButton.addEventListener("click", function(event) {
    if (!isRunning || currentLevel.length === 0) {
      return;
    }
    changeBackground("green");
    var current = currentLevel.shift();
    if (current !== "green") {
      gameOver();
    }
    else if (currentLevel.length === 0) {
      endLevel();
    }
  });
  redButton.addEventListener("click", function() {
    if (!isRunning || currentLevel.length === 0) {
      return;
    }
    changeBackground("red");
    var current = currentLevel.shift();
    if (current !== "red") {
      gameOver();
    }
    else if (currentLevel.length === 0) {
      endLevel();
    }
  });
  yellowButton.addEventListener("click", function() {
    if (!isRunning || currentLevel.length === 0) {
      return;
    }
    changeBackground("yellow");
    var current = currentLevel.shift();
    if (current !== "yellow") {
      gameOver();
    }
    else if (currentLevel.length === 0) {
      endLevel();
    }
  });
  blueButton.addEventListener("click", function() {
    if (!isRunning || currentLevel.length === 0) {
      return;
    }
    changeBackground("blue");
    var current = currentLevel.shift();
    if (current !== "blue") {
      gameOver();
    }
    else if (currentLevel.length === 0) {
      endLevel();
    }
  });
}

// STARTS A NEW GAME
function startGame() {
  levelNum = 1;
  isRunning = true;
  var firstLevel = new Level(1, 2);
  setTimeout(function() {
    executeLevel(firstLevel);
  }, 500);
  setTimeout(function() {
  }, 501 + (2 * firstLevel.numberOfMemorizations));
}

// RETURNS A RANDOM BUTTON COLOR AS A STRING
function getRandomButton() {
  var color = "";
  var random = Math.random() * 4;
  if (random < 1) {
    color = "green";
  }
  else if (random < 2) {
    color = "red";
  }
  else if (random < 3) {
    color = "yellow";
  }
  else {
    color = "blue";
  }
  return color;
}

// EXECUTES A GIVEN LEVEL OBJECT
function executeLevel(level) {
  var numTimesExecuted = 0;
  var interval = setInterval(function() {
    if (numTimesExecuted >= level.numberOfMemorizations) {
      isRunning = true;
      clearInterval(interval);
    }
    else {
      var color = getRandomButton();
      changeBackground(color);
      currentLevel.push(color);
      numTimesExecuted += 1;
    }
  }, 500);
}

// ENDS THE CURRENT LEVEL AND STARTS A NEW ONE
function endLevel() {
  currentLevel = [];
  levelNum += 1;
  $(".level-title").text("Level " + levelNum);
  var nextLevel = new Level(levelNum, levelNum + 1);
  isRunning = false;
  setTimeout(function() {
    executeLevel(nextLevel);
  }, 2000);
}

// ENDS THE CURRENT GAME
function gameOver() {
  var prevLevel = levelNum;
  currentLevel = [];
  levelNum = 1;
  $(".level-title").text("Level 1");
  $(".start-game-text").removeClass("invisible");
  $(".start-game-text").text("You made it to level " + prevLevel + "! Press space bar to play again.");
  isRunning = false;
}

// ACTIVATES CLICK LISTENERS ON PAGE LOAD
activateOnClicks();
