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
var quizQuest = document.createElement("p");
var options = document.createElement("button");
var questionNumber = 0;
var choice = "";

// function for starting quiz
var startQuiz = function(event) {
    // clear screen
    quizIntroEl.remove(); 
    // add elements for quiz
    //var quizQuest = document.createElement("p");
    quizContainer = document.createElement("div");
    quizContainer.className = ("quiz-container");
        
    // add questions and answers to elements
    if (questionNumber < myQuestions.length) {
             
        quizQuest.innerHTML = myQuestions[questionNumber].question;
        quizCardEl.appendChild(quizQuest);
        
        for (var j = 0; j < 4; j++) {
            options = document.createElement("button");
            options.className = "option-btn";
            options.innerHTML = myQuestions[questionNumber].answers[j];
            options.setAttribute("id", "btnid" + j);
            quizContainer.appendChild(options);
            quizCardEl.appendChild(quizContainer);
            console.log(options);
        }  
        // for submitting answers
        quizContainer.addEventListener("click", submitAnswer); 
    }
    
};


var displayAnswer = function(choice) {
    console.log(choice);
    //console.log("hi");
    document.querySelector("#message").textContent = choice;
    quizContainer.remove();
    startQuiz();
};

// function for display results

var displayResults = function() {
    quizCardEl.remove();
    var scoreCardEl = document.createElement("div");
    scoreCardEl.innerHTML =
    "<h3 class=''>All done!</h3> <p class=''>Your final score is" + x + ".";

};

var submitAnswer = function (event) {
    //debugger;
   // console.log("hi");
   var optionId = event.target.id;
    if (optionId === myQuestions[questionNumber].correctAnswer) {
        choice = "Correct!";
    }
    else {
        choice = "Wrong!";
    }
    questionNumber++;
    console.log(questionNumber);
    console.log(myQuestions.length);
    if (questionNumber === myQuestions.length) {
        // call Results
        debugger;
        console.log("All done!");
        displayResults();
    }
    
    displayAnswer(choice);
};

// for Start Quiz button
quizIntroEl.addEventListener("click", startQuiz);
// for submitting answers
quizContainer.addEventListener("click", submitAnswer);
