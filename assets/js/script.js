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
var score = 0;

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
        quizContainer.appendChild(quizQuest);
        
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
    quizContainer.remove();
    console.log("Results");

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

var submitAnswer = function (event) {
    //debugger;
   // console.log("hi");
   var optionId = event.target.id;
    if (optionId === myQuestions[questionNumber].correctAnswer) {
        choice = "Correct!";
        score = score + 20;
        console.log(score);
    }
    else {
        choice = "Wrong!";
    }
    questionNumber++;
    console.log(questionNumber);
    console.log(myQuestions.length);
    if (questionNumber === myQuestions.length) {
        // call Results
        //debugger;
        console.log("All done!");
        displayResults();
    }
    else {
        displayAnswer(choice);
    }
};

// for Start Quiz button
quizIntroEl.addEventListener("click", startQuiz);
// for submitting answers
//quizContainer.addEventListener("click", submitAnswer);
