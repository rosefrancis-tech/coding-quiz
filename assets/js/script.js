// global variables declaration
var body = document.querySelector("#body");
var quizCardEl  = document.querySelector("#quiz-card");
var headerEl = document.querySelector("#header");
var quizIntroEl = document.querySelector("#quiz-intro");
var startBtnEl = document.querySelector(".btn");
var highScoreLinkEl = document.querySelector("#high-scores");
var quizContainer = document.createElement("div");
var quizQuest = document.createElement("h1");
var footerEl = document.createElement("footer");
var scoreCardEl = document.createElement("div");
var myQuestions = [
    {
        question: "Commonly used datatypes Do Not include",
        answers: [
          "1. Strings",
          "2. Booleans",
          "3. Alerts",
          "4. Numbers"
        ],
        correctAnswer: "btnid2"
    },
    {
        question: "Which of the following is NOT a reason to validate a user's responses?",
        answers: [
          "1. Offers the user an opportunity to enter a correct response.",
          "2. Reduces bogus answers getting stored in the database.",
          "3. Improves the user experience.",
          "4. Increases the overall quality of the user data."
        ],
        correctAnswer: "btnid2"
    },
    {
        question: "Which statement does NOT guarantee that number will be non-negative?",
        answers: [
          "1. number = Math.max(1, highScore);",
          "2. if (number < 0) {number = 1;}",
          "3. number = Math.random();",
          "4. number = Math.min(10, highScore);"
        ],
        correctAnswer: "btnid3"
    },
    {
        question: "Which statement correctly stores data into the Web Storage API?",
        answers: [
          "1. localStorage.getItem('lunch', 'sandwich');",
          "2. localStorage.setItem('lunch', 'sandwich')",
          "3. getItem.localStorage.('lunch', 'sandwich')",
          "4. setItem.localStorage('lunch', 'sandwich')"
        ],
        correctAnswer: "btnid1"
    },
    {
        question: "Which of these values is NOT considered false?",
        answers: [
          "1. 0",
          "2. '0'",
          "3. null",
          "4. ''"
        ],
        correctAnswer: "btnid1"
    },
    { 
        question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
        answers: [
          "1. if i <> 5",
          "2. if (i != 5)",
          "3. if (i <> 5)",
          "4. if i =! 5 then"
        ],
        correctAnswer: "btnid1"
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        answers: [
          "1. alert('Hello World')",
          "2. msgBox('Hello World')",
          "3. alertBox('Hello World')",
          "4. msg('Hello World')"
        ],
        correctAnswer: "btnid0"
    },
    {
      question: "Who invented JavaScript?",
      answers: [
        "1. Douglas Crockford",
        "2. Sheryl Sandberg",
        "3. Brendan Eich",
        "4. Chris Beard"
      ],
      correctAnswer: "btnid2"
    },
    {
      question: "Which one of these is a JavaScript package manager?",
      answers: [
        "1. Node.js",
        "2. TypeScript",
        "3. npm",
        "4. JSON"
      ],
      correctAnswer: "btnid2"
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: [
        "1. Angular",
        "2. jQuery",
        "3. RequireJS",
        "4. ESLint"
      ],
      correctAnswer: "btnid3"
    }
  ];
var questionNumber = 0;
var choice = "";
var score = 0;
var counter = (myQuestions.length) * 10;
var flag = false;
var highScores = [];

// function for starting quiz
var startQuiz = function(event) {
    // clear screen
    quizIntroEl.remove(); 
    // add elements for quiz
    quizContainer = document.createElement("div");
    quizContainer.className = ("quiz-container");
    quizContainer.setAttribute("onmousedown", "clearFooter()");
    quizCardEl.appendChild(quizContainer);         
    // add questions to elements
    if (questionNumber < myQuestions.length) {
        quizQuest.className = ("quiz-quest");
        quizQuest.innerHTML = myQuestions[questionNumber].question;
        quizContainer.appendChild(quizQuest);
        // add answer options
        var list = document.createElement("div");
        list.className = "optionList";
        quizContainer.appendChild(list); 
        for (var j = 0; j < myQuestions[j].answers.length; j++) {
            var options = document.createElement("div");
            options.className = "option-btn";
            options.innerHTML = myQuestions[questionNumber].answers[j];
            options.setAttribute("id", "btnid" + j);
            list.appendChild(options);    
        }  
        // for submitting answers
        list.addEventListener("mouseup", submitAnswer); 
    }
};

// function for displaying the answer in footer
var displayAnswer = function(choice) {
    console.log(choice);
    body.appendChild(footerEl);
    footerEl.className = "message";
    footerEl.textContent = choice; 
};

// function for clear footer
var clearFooter = function () {
    footerEl.remove();
};

// function for clear header
var clearHeader = function () {
    //change the font color to background color for hiding
    headerEl.setAttribute("style", "color: white;");
    highScoreLinkEl.setAttribute("style", "color: white;");
};

// function for displaying results
var displayResults = function() {
    quizContainer.remove();
    // create heading element    
    scoreCardEl.className = "score-card";
    var scoreEl1 = document.createElement("h1");
    quizCardEl.appendChild(scoreCardEl);
    scoreEl1.innerHTML = "All done!";
    scoreCardEl.appendChild(scoreEl1);
    // create paragraph element
    var scoreEl2 = document.createElement("p");
    scoreEl2.innerHTML = "Your final score is " + score +".";
    scoreCardEl.appendChild(scoreEl2);
    // Create section and hold label, input and button elements
    var formEl = document.createElement("section");
    scoreCardEl.appendChild(formEl);

    var scoreEl3 = document.createElement("label");
    scoreEl3.setAttribute("for", "nick-name");
    scoreEl3.innerHTML = "Enter Initials: ";
    formEl.appendChild(scoreEl3);
    
    var scoreEl4 = document.createElement("input");
    scoreEl4.setAttribute("type", "text");
    scoreEl4.setAttribute("id", "nick-name");
    scoreEl4.setAttribute("name", "initial");
    scoreEl4.setAttribute("value", "");
    formEl.appendChild(scoreEl4);

    var scoreEl5 = document.createElement("button");
    scoreEl5.setAttribute("type", "button");
    scoreEl5.setAttribute("onmousedown", "clearFooter()");
    scoreEl5.innerHTML = "Submit";
    formEl.appendChild(scoreEl5);
    // Current initial and score is stored as object
    var scoreObj = {
        thisName: scoreEl4.value,
        thisScore: score
    };
    // Event listener for submitting scores and initials
    scoreEl5.addEventListener("click", function() {
        
        // give the initial the input value from the browser
        scoreObj.thisName = document.querySelector("input[name='initial']").value.toUpperCase();
    
        // condition when no initial is entered
        if(!scoreObj.thisName) {
            alert("Please enter your initials");
        }
        else {
        
        // call function for retrieve and save with local storage
        scoreHistory(scoreObj);

        // call function to display high scores list
        viewHighScores();     
        }
    });
};

// function for view high scores
var viewHighScores = function () {
    highScoreLinkEl.removeEventListener("click", spoilerAlert, false);
    clearHeader();
    scoreCardEl.remove();
    
    var highScoreCardEl = document.createElement("div");
    highScoreCardEl.className = "highscore-card";
    quizCardEl.appendChild(highScoreCardEl);

    var headEl = document.createElement("h1");
    headEl.innerHTML = "High scores";
    highScoreCardEl.appendChild(headEl);
    
    // create table element
    var tableEl = document.createElement("table");
    tableEl.setAttribute("id", "score-table");
    highScoreCardEl.appendChild(tableEl);
    
    //create table rows
    for(var i = 0; i < highScores.length; i++) {
        var serialNo = i+1;
        var y = document.createElement("tr");
        y.setAttribute("id", "score-tr");
        tableEl.appendChild(y);
    
        var z = document.createElement("td");
        z.innerHTML = serialNo + ". " + highScores[i].thisName + " - " + highScores[i].thisScore;
        y.appendChild(z);
    }
    // create buttons
    var highScoreButton = document.createElement("div");
    highScoreButton.className = "button-group"
    highScoreCardEl.appendChild(highScoreButton);

    var goBackEl = document.createElement("button");
    goBackEl.setAttribute("type", "submit");
    goBackEl.className ="goback-btn";
    goBackEl.innerHTML = "Go back";
    highScoreButton.appendChild(goBackEl);

    var clearEl = document.createElement("button");
    clearEl.setAttribute("type", "submit");
    clearEl.className ="clear-btn";
    clearEl.innerHTML = "Clear high scores";
    highScoreButton.appendChild(clearEl);

    // for refresh page on button click
    goBackEl.addEventListener("click", function() {
    location.reload()
    });

    // for clear local storage on button click
    clearEl.addEventListener("click", function() {
        localStorage.clear();
        tableEl.remove();
    });
};

// function for local storage
var scoreHistory = function(scoreObj) {
    
        // get values from local storage
        var savedScores = localStorage.getItem("webScores");
        savedScores = JSON.parse(savedScores);
        
        var isExist = false;
        var previousScore = 0;
        var previousIndex = 0;
        // condition when there is previous value saved in local storage
        if(savedScores) {
            // loop for checking all elements of local storage
            for (var l = 0; l < savedScores.length; l++){
                // condition to find any previous score for user with same initial
                if(savedScores[l].thisName === scoreObj.thisName) {
                    isExist = true;
                    previousScore = savedScores[l].thisScore;
                    previousIndex = l;
                    break;
                }
            }
            // Case 1 of 3: condition when there is a previous score for the current initial
            if (isExist === true) {
                // compare and get the highest score from the current and saved values
                var highestValue = Math.max(previousScore, scoreObj.thisScore);
                var modifiedScore = {
                    thisName: scoreObj.thisName, 
                    thisScore: highestValue
                }; 
                // replace the previous score with the present highscore
                savedScores.splice(previousIndex, 1, modifiedScore);
                highScores = savedScores;
            }
            // Case 2 of 3: condition when there is no previous score for the current initial
            else {
                highScores = savedScores;
                highScores.push(scoreObj);  
            } 
        }
        // Case 3 of 3: condition for no saved scores
        else {
            highScores.push(scoreObj);
        }
        // saving into local storage
        var webScores = highScores;
        localStorage.setItem("webScores", JSON.stringify(webScores));
};

// function for checking answers and calculating scores
var submitAnswer = function (event) {
   // execute function if only clicked on any of the options 
   if(event.target.matches(".option-btn")) {
        var optionId = event.target.id;
        // condition for verifying the right and wrong choices
        if (optionId === myQuestions[questionNumber].correctAnswer) {
            choice = "Correct!";
            // add score by 20 for correct choice
            score = score + 20;
        }
        else {
            choice = "Wrong!";
            // reduce time by 10 seconds for wrong choice
            counter = counter - 10;
        }
        questionNumber++;
        // show answer
        displayAnswer(choice);
        // display next question   
        nextQuestion(questionNumber);
    }
};

// function for either display next question or game-over when all questions answered
var nextQuestion = function(questionNumber) {
    // when questions finish
    if (questionNumber === myQuestions.length) {
        // set timer to zero
        counter = 0;
        console.log("All done!");
        // show final score
        displayResults();   
        // flag to know results are displayed  
        flag = true; 
    }
    // when questions are not finished
    else {
        // remove current question and options from screen
        quizContainer.remove();
        // show next question and options
        startQuiz();
    }
};

// function for timer countdown and game over when time runs out
var timer = function(event) {
    // display total time available
    var time = document.querySelector("#time-left");
    time.innerHTML = counter;
    
    // function for countdown
    var countdown = function () {
        counter --;
        // display current time, discard negative values
        if(Math.sign(counter) === -1) {
            time.innerHTML = 0;
        }
        else if (Math.sign(counter >= 0)) {
            time.innerHTML = counter;
        }

        // stop counting below zero
        if (counter <= 0) {
            clearInterval(startCountdown);
            // display results only if results not displayed
            if (flag === false) {
                displayResults();
                clearInterval(startCountdown);
            }
        }
    };
    // start countdown timer
    var startCountdown = setInterval(countdown,1000);
};

// function for view scores from other pages
var spoilerAlert = function() {
    alert("High Scores will be displayed at the end of the quiz when you submit your score!");
};

// for Start Quiz button
startBtnEl.addEventListener("click", startQuiz);
// for starting timer
startBtnEl.addEventListener("click", timer);
// for view high scores
highScoreLinkEl.addEventListener("click", spoilerAlert);
