var quizIntroEl = document.querySelector("#quiz-intro");
var quizCardEl  = document.querySelector("#quiz-card");
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

var quizContainer = document.createElement("div");
var quizQuest = document.createElement("h3");
var options = document.createElement("button");
var questionNumber = 0;
var choice = "";
var score = 0;
var counter = 30;
var flag = false;

// function for starting quiz
var startQuiz = function(event) {
    // clear screen
    quizIntroEl.remove(); 
    
    // add elements for quiz
    quizContainer = document.createElement("div");
    quizContainer.className = ("quiz-container");
        
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
            quizContainer.appendChild(options);
            quizCardEl.appendChild(quizContainer);
            
        }  
        // for submitting answers
        quizContainer.addEventListener("click", submitAnswer); 
    }
    
};

// function for displaying whether the answer was right or wrong
var displayAnswer = function(choice) {
    console.log(choice);
    document.querySelector("#message").textContent = choice;
};

// function for displaying results
var displayResults = function() {
    quizContainer.remove();
    
    var scoreCardEl = document.createElement("div");
    scoreCardEl.className = ".quiz-card";
    var scoreEl1 = document.createElement("h3");
    quizCardEl.appendChild(scoreCardEl);
    scoreEl1.innerHTML = "All done!";
    scoreCardEl.appendChild(scoreEl1);
    
    var scoreEl2 = document.createElement("p");
    scoreEl2.innerHTML = "Your final score is " + score +".";
    scoreCardEl.appendChild(scoreEl2);

    var scoreEl3 = document.createElement("label");
    scoreEl3.setAttribute("for", "score");
    scoreEl3.innerHTML = "Enter Initials: ";
    scoreCardEl.appendChild(scoreEl3);
    
    var scoreEl4 = document.createElement("input");
    scoreEl4.setAttribute("type", "text");
    scoreEl4.setAttribute("id", "score");
    scoreEl4.setAttribute("name", "score");
    scoreCardEl.appendChild(scoreEl4);

    var scoreEl5 = document.createElement("button");
    scoreEl5.setAttribute("type", "submit");
    scoreEl5.innerHTML = "Submit";
    scoreCardEl.appendChild(scoreEl5);
};

// function for checking answers and calculating scores
var submitAnswer = function (event) {
    
   var optionId = event.target.id;
    if (optionId === myQuestions[questionNumber].correctAnswer) {
        choice = "Correct!";
        score = score + 20;
        console.log(score);
    }
    else {
        choice = "Wrong!";
        counter = counter - 10;
        console.log(score);
    }
    questionNumber++;
    callF(questionNumber);
};

// function for checking last question
var callF = function(questionNumber) {
     // check if this is the last question
     if (questionNumber === myQuestions.length) {
        // show answer
        displayAnswer(choice);
        console.log("All done!");
        // show final score
        displayResults();     
        flag = true; 
    }
    else {
        // show answer
        displayAnswer(choice);
        // remove last question and options
        quizContainer.remove();
        // show new question and options
        startQuiz();
    }
};

// function for timer countdown and game over if time: 0
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

// for Start Quiz button
quizIntroEl.addEventListener("click", startQuiz);
// for starting timer
quizIntroEl.addEventListener("click", timer);
