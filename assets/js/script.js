var quizIntroEl = document.querySelector("#quiz-intro");
var quizCardEl  = document.querySelector("#quiz-card");
var myQuestions = [
    {
      question: "Who invented JavaScript?",
      answers: {
        a: "Douglas Crockford",
        b: "Sheryl Sandberg",
        c: "Brendan Eich",
        d: "Bill Gates"
      },
      correctAnswer: "c"
    },
    {
      question: "Which one of these is a JavaScript package manager?",
      answers: {
        a: "Node.js",
        b: "TypeScript",
        c: "npm",
        d: "JSON"
      },
      correctAnswer: "c"
    },
    {
      question: "Which tool can you use to ensure code quality?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint"
      },
      correctAnswer: "d"
    }
  ];
// function for starting quiz
var startQuiz = function() {
    // clear screen
    quizIntroEl.remove();
    
    // add elements for questions and answers
    var quizContainer = document.createElement("div");
    var quizQuest = document.createElement("p");
    var option1 = document.createElement("button");
    var option2 = document.createElement("button");
    var option3 = document.createElement("button");
    var option4 = document.createElement("button");
    
    // add questions and answers to elements
    for (var i = 0; i < myQuestions.length; i++) {
              
        quizQuest.innerHTML = myQuestions[i].question;
        option1.innerHTML = myQuestions[i].answers.a;
        option2.innerHTML = myQuestions[i].answers.b;
        option3.innerHTML = myQuestions[i].answers.c;
        option4.innerHTML = myQuestions[i].answers.d;
        
       var quizContainer = document.createElement("div");
        quizContainer.appendChild(quizQuest);
        quizContainer.appendChild(option1);
        quizContainer.appendChild(option2);
        quizContainer.appendChild(option3);
        quizContainer.appendChild(option4);
        quizCardEl.appendChild(quizContainer);
        debugger;
    }
};
// for Start Quiz button
quizIntroEl.addEventListener("click", startQuiz);
