var answers = [];
var answersCSV = [];
var finalAnswerCSV = [];

function nextEmail() {
    toggleButton();
    var timeSpent = Date.now() - questionStart;
    answers.push(currentEmail + " Time: " + timeSpent / 1000 + " seconds");
    answersCSV.push(timeSpent/1000)

    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
    document.getElementById("result").innerHTML = "";


    if (currentEmail == 5) {
        testTimeSpent = Date.now() - testStart;
        answersCSV.push(testTimeSpent/1000);
        finalAnswerCSV.push(["Q1T","Q2T","Q3T","Q4T","Q5T","TotalT"])
        finalAnswerCSV.push(answersCSV)
        const jsonString = JSON.stringify(finalAnswerCSV);
        const encodedParam = encodeURIComponent(jsonString);
        answers.push("Quiz Complete. Total time spent: " + testTimeSpent / 1000 + " seconds");
        alert(answers.join("\n"));
        window.location.href = 'comments.html?data=' + encodedParam;
    } else {
        currentEmail++;
    }
    
    // iframe
    var container = document.getElementById("email-container");
    container.innerHTML = "";
    var iframe = document.createElement("iframe");
    iframe.src = "email_learn/email_" + currentEmail + ".html";
    container.appendChild(iframe);
    questionStart = Date.now();
}

function toggleButton() {
    var button = document.getElementById("next-email");
    if (button.style.visibility === "hidden") {
      button.style.visibility = "visible";
    } else {
      button.style.visibility = "hidden";
    }  
}

document.getElementById("quiz-form").addEventListener("submit", function (event) {
    event.preventDefault();
    let checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
    let selectedAnswers  = [];
    let incorrectAnswers = [];

    for (var i = 0; i < checkboxes.length; i++) {
        selectedAnswers.push(checkboxes[i].name);
    }

    let isCorrect = []
    if (currentEmail === 1) {
        isCorrect = correctAnswers1.every(answer => selectedAnswers.includes(answer));
        incorrectAnswers = correctAnswers1.filter(answer => !selectedAnswers.includes(answer));
    } else if (currentEmail === 2) {
        isCorrect = correctAnswers2.every(answer => selectedAnswers.includes(answer));
        incorrectAnswers = correctAnswers2.filter(answer => !selectedAnswers.includes(answer));
    } else if (currentEmail === 3) {
        isCorrect = correctAnswers3.every(answer => selectedAnswers.includes(answer));
        incorrectAnswers = correctAnswers3.filter(answer => !selectedAnswers.includes(answer));
    } else if (currentEmail === 4) {
        isCorrect = correctAnswers4.every(answer => selectedAnswers.includes(answer));
        incorrectAnswers = correctAnswers4.filter(answer => !selectedAnswers.includes(answer));
    } else if (currentEmail === 5) {
        isCorrect = correctAnswers5.every(answer => selectedAnswers.includes(answer));
        incorrectAnswers = correctAnswers5.filter(answer => !selectedAnswers.includes(answer));
    } 
    
    if (!isCorrect) {
        document.getElementById("result").innerHTML = `You got the following answers wrong: ${incorrectAnswers.join(', ')}.`;
    } else {
        document.getElementById("result").innerHTML ='Congratulations, you got all the answers correct!';
        toggleButton();
    }
});

let answersDict = ["general-language", "spelling-grammatical-errors", "spoofed-email-sender", "urgent-language", "spoofed-url", "wrong-redirect"];
let correctAnswers1 = ["spelling-grammatical-errors", "urgent-language", "wrong-redirect"]; // email_93
let correctAnswers2 = ["general-language"]; // email_94
let correctAnswers3 = ["general-language", "spoofed-email-sender"]; // email_96
let correctAnswers4 = ["spelling-grammatical-errors", "spoofed-email-sender"]; // email_133
let correctAnswers5 = ["spoofed-email-sender", "wrong-redirect"]; // email_137


// iframe
var currentEmail = 1;
var container = document.getElementById("email-container");
container.innerHTML = "";
var iframe = document.createElement("iframe");
iframe.src = "email_learn/email_1.html";
container.appendChild(iframe);

var questionStart = Date.now();
var testStart = Date.now();