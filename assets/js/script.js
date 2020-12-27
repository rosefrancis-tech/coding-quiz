var quizIntroEl = document.querySelector("#quiz-intro");

// function for starting quiz
var startQuiz = function() {
    quizIntroEl.remove();
};
// for Start Quiz button
quizIntroEl.addEventListener("click", startQuiz);
