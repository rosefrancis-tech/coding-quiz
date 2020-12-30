// global variables declaration
var body = document.querySelector("#body");
var quizCardEl  = document.querySelector("#quiz-card");
var headerEl = document.querySelector("#header");
var footerEl = document.querySelector("#message");
var quizIntroEl = document.querySelector("#quiz-intro");

var quizContainer = document.createElement("div");
var quizQuest = document.createElement("h3");
var options = document.createElement("button");
var scoreCardEl = document.createElement("div");
var highScoreLinkEl = document.querySelector("#high-scores");

var myQuestions = [
    {
      question: "Who invented JavaScript?",
      answers: [
        "Douglas Crockford",
        "Sheryl Sandberg",
        "Brendan Eich",
        "Bill Gates"
      ],
      correctAnswer: "btnid2"
    },
    {
      question: "Which one of these is a JavaScript package manager?",
      answers: [
        "Node.js",
        "TypeScript",
        "npm",
        "JSON"
      ],
      correctAnswer: "btnid2"
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: [
        "Angular",
        "jQuery",
        "RequireJS",
        "ESLint"
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
            
    // add questions to elements
    if (questionNumber < myQuestions.length) {
             
        quizQuest.innerHTML = myQuestions[questionNumber].question;
        quizContainer.appendChild(quizQuest);
        // add option buttons to elements
        for (var j = 0; j < 4; j++) {
            options = document.createElement("button");
            options.className = "option-btn";
            options.innerHTML = myQuestions[questionNumber].answers[j];
            options.setAttribute("id", "btnid" + j);
            //options.setAttribute("onmousedown", "clearFooter()");
            quizContainer.appendChild(options);
            quizCardEl.appendChild(quizContainer);
            
        }  
        // for submitting answers
        quizContainer.addEventListener("mouseup", submitAnswer); 
    }
    
};

// function for displaying the answer in footer
var displayAnswer = function(choice) {
    console.log(choice);
    body.appendChild(footerEl);
    footerEl.textContent = choice;
   
};

// function for clear footer
var clearFooter = function () {
    debugger;
    footerEl.remove();
};

// function for clear header
var clearHeader = function () {
    headerEl.remove();
};

// function for displaying results
var displayResults = function() {
    quizContainer.remove();
        
    scoreCardEl.className = ".quiz-card";
    var scoreEl1 = document.createElement("h3");
    quizCardEl.appendChild(scoreCardEl);
    scoreEl1.innerHTML = "All done!";
    scoreCardEl.appendChild(scoreEl1);
    
    var scoreEl2 = document.createElement("p");
    scoreEl2.innerHTML = "Your final score is " + score +".";
    scoreCardEl.appendChild(scoreEl2);
/*
    var formEl = document.createElement("form");
    scoreCardEl.appendChild(formEl);
*/
    var scoreEl3 = document.createElement("label");
    scoreEl3.setAttribute("for", "nick-name");
    scoreEl3.innerHTML = "Enter Initials: ";
    scoreCardEl.appendChild(scoreEl3);
    
    var scoreEl4 = document.createElement("input");
    scoreEl4.setAttribute("type", "text");
    scoreEl4.setAttribute("id", "nick-name");
    scoreEl4.setAttribute("name", "initial");
    scoreEl4.setAttribute("value", "");
    //scoreEl4.setAttribute("required", "");
    scoreCardEl.appendChild(scoreEl4);

    var scoreEl5 = document.createElement("button");
    scoreEl5.setAttribute("type", "button");
    scoreEl5.setAttribute("onmousedown", "clearFooter()");
    scoreEl5.innerHTML = "Submit";
    scoreCardEl.appendChild(scoreEl5);
    
    var scoreObj = {
        thisName: scoreEl4.value,
        thisScore: score
    };
    
    scoreEl5.addEventListener("click", function() {
        
        // call function for clear header
        clearHeader();

        // call function for local storage
        scoreHistory(scoreObj);
        if(scoreObj.thisName){
        // call function to display high scores
        viewHighScores();    
        }  
    });
};

// function for view high scores
var viewHighScores = function () {
    // if the quiz were completed in the current session, header and footer is already cleared
    if(highScores.length === 0) {
        // call function for clear header
        clearHeader();
        // call function for clear footer
        clearFooter();
    }
    scoreCardEl.remove();
    
    var highScoreCardEl = document.createElement("div");
    highScoreCardEl.className = ".quiz-card";
    var headEl = document.createElement("h3");
    quizCardEl.appendChild(highScoreCardEl);
    headEl.innerHTML = "High Scores";
    highScoreCardEl.appendChild(headEl);
    
    // create table element
    var tableEl = document.createElement("table");
    tableEl.setAttribute("id", "score-table");
    highScoreCardEl.appendChild(tableEl);
    
    //create table rows
    for(var i = 0; i < highScores.length; i++) {
        
        var y = document.createElement("tr");
        y.setAttribute("id", "score-tr");
        tableEl.appendChild(y);
    
        var z = document.createElement("td");
        z.innerHTML = highScores[i].thisName + " - " + highScores[i].thisScore;
        y.appendChild(z);
    }
    // create buttons
    var goBackEl = document.createElement("button");
    goBackEl.setAttribute("type", "submit");
    goBackEl.innerHTML = "Go back";
    highScoreCardEl.appendChild(goBackEl);

    var clearEl = document.createElement("button");
    clearEl.setAttribute("type", "submit");
    clearEl.innerHTML = "Clear high Scores";
    highScoreCardEl.appendChild(clearEl);

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
    scoreObj.thisName = document.querySelector("input[name='initial']").value;
    if(!scoreObj.thisName) {
        alert("Please enter your initials");
        return false;
    }
    else {
    var savedScores = localStorage.getItem("webScores");
    savedScores = JSON.parse(savedScores);
    if(savedScores) {
        highScores = savedScores;
    }
    highScores.push(scoreObj);
    var webScores = highScores;        
    localStorage.setItem("webScores", JSON.stringify(webScores));
}
};

// function for checking answers and calculating scores
var submitAnswer = function (event) {
    
   var optionId = event.target.id;
    if (optionId === myQuestions[questionNumber].correctAnswer) {
        choice = "Correct!";
        score = score + 20;
    }
    else {
        choice = "Wrong!";
        counter = counter - 10;
    }
    questionNumber++;
    // show answer
    displayAnswer(choice);
    // display next question   
    nextQuestion(questionNumber);
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
    alert("High Scores will be displayed when you submit your score!");
};

// for Start Quiz button
quizIntroEl.addEventListener("click", startQuiz);
// for starting timer
quizIntroEl.addEventListener("click", timer);
// for view high scores
highScoreLinkEl.addEventListener("click", spoilerAlert);
