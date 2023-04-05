

function nextEmail() {
    toggleButton();
    var timeSpent = Date.now() - questionStart;
    answers.push(currentEmail + " Time: " + timeSpent / 1000 + " seconds");
    answersCSV.push(timeSpent/1000);
    answersCSV.push(hoverQuestion);
    totalHover += hoverQuestion;
    hoverQuestion = 0;

    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
    document.getElementById("result").innerHTML = "";


    if (currentEmail == 8) {
        testTimeSpent = Date.now() - testStart;
        answersCSV.push(testTimeSpent/1000);
        answersCSV.push(totalHover);
        finalAnswerCSV.push(["Q1T","Q1H","Q2T","Q2H","Q3T","Q3H","Q4T","Q4H","Q5T","Q5H","Q6T","Q6H","Q7T","Q7H","Q8T","Q8H","TotalT","TotalH"]);
        finalAnswerCSV.push(answersCSV);
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

    for (var i = 0; i < checkboxes.length; i++) {
        selectedAnswers.push(checkboxes[i].name);
    }

    let correctAnswers;
    if (currentEmail === 1) {
        correctAnswers = correctAnswers1;
    } else if (currentEmail === 2) {
        correctAnswers = correctAnswers2;
    } else if (currentEmail === 3) {
        correctAnswers = correctAnswers3;
    } else if (currentEmail === 4) {
        correctAnswers = correctAnswers4;
    } else if (currentEmail === 5) {
        correctAnswers = correctAnswers5;
    } else if (currentEmail === 6) {
        correctAnswers = correctAnswers6;
    } else if (currentEmail === 7) {
        correctAnswers = correctAnswers7;
    } else if (currentEmail === 8) {
        correctAnswers = correctAnswers8;
    }

    let correctCount = selectedAnswers.filter(answer => correctAnswers.includes(answer)).length;
    let incorrectCount = selectedAnswers.length - correctCount;
    
    document.getElementById("result").innerHTML = `You got ${correctCount} answer(s) right and ${incorrectCount} answer(s) wrong.`;

    if (correctCount === correctAnswers.length && incorrectCount === 0) {
        toggleButton();
    }
});


let answersDict = {"general-language":"General Language", "spelling-grammatical-errors":"Spelling/Grammatical Errors",
 "spoofed-email-sender":"Spoofed Email Sender", "urgent-language":"Urgent Language", "wrong-redirect":"Wrong Redirect"};
let correctAnswers1 = ["urgent-language", "wrong-redirect"]; // email_93
let correctAnswers2 = ["general-language", "spoofed-email-sender"]; // email_94
let correctAnswers3 = ["general-language", "spelling-grammatical-errors", "wrong-redirect"]; // email_96
let correctAnswers4 = ["spelling-grammatical-errors", "general-language", "urgent-language"]; // email_133
let correctAnswers5 = ["spoofed-email-sender", "wrong-redirect", "general-language", "spelling-grammatical-errors"]; // email_137
let correctAnswers6 = ["wrong-redirect", "urgent-language"]; // email_137
let correctAnswers7 = ["wrong-redirect", "spoofed-email-sender"]; // email_137
let correctAnswers8 = ["general-language", "wrong-redirect", "spoofed-email-sender"]; // email_137

var answers = [];
var answersCSV = [];
var finalAnswerCSV = [];
var hoverTimes = []


// iframe
var currentEmail = 1;
var container = document.getElementById("email-container");
container.innerHTML = "";
var iframe = document.createElement("iframe");
iframe.src = "email_learn/email_1.html";
container.appendChild(iframe);

var questionStart = Date.now();
var testStart = Date.now();
var hoverStart = 0;
var hoverQuestion = 0;
var totalHover = 0;

const descriptions = [
    {
      id: 'general-language',
      text: 'General Language',
      description:
        "'General Language' in phishing emails refers to phrasing that contains awkward sentence structures. It can also indicate language that is not specifically tailored to the recipient, but instead targets a broader audience."
    },
    {
      id: 'spelling-grammatical-errors',
      text: 'Spelling/Grammatical Errors',
      description:
        '"Spelling/Grammatical Errors" in phishing emails refer to emails that contain obvious spelling, punctuation or grammatical errors. Such errors may signal that the email is a phishing attempt, as attackers may not be as concerned with proper grammar and spelling as legitimate organizations. For example, an email that says "Your accuont has been temporarly locked" may be a phishing attempt.'
    },
    {
      id: 'spoofed-email-sender',
      text: 'Spoofed Email Sender',
      description:
        '"Spoofed Email Sender" in phishing emails refers to the practice of disguising the true origin of an email by altering the sender information. Attackers can use this tactic to make an email appear as if it comes from a trusted source, such as a bank or a well-known company, in order to trick the recipient into disclosing sensitive information or clicking on a malicious link. For example, an email that appears to be from a bank but has a sender address that does not match the bank\'s official domain may be a phishing attempt.'
    },
    {
      id: 'urgent-language',
      text: 'Urgent Language',
      description:
        '"Urgent Language" in phishing emails refers to the use of language designed to create a sense of urgency or importance in the recipient, in order to prompt them to take immediate action without thinking. This tactic is often used to pressure the recipient into clicking on a link or providing sensitive information, by making them believe that failing to act quickly will have negative consequences. For example, an email that says "Your account will be closed if you do not update your information immediately" may be a phishing attempt.'
    },
    {
      id: 'wrong-redirect',
      text: 'Wrong Redirect',
      description:
        '"Wrong Redirect" in phishing emails refers to the practice of redirecting the recipient to a different website than the one they were expecting to visit. This tactic is often used to redirect the recipient to a fake website that looks similar to a legitimate one, in order to trick them into providing sensitive information or downloading malware. For example, an email that contains a link to a legitimate banking website but redirects to a fake website designed to steal login credentials may be a phishing attempt.'
    },
  ];  
  
  const descriptionContainer = document.getElementById('description-container');
  
  descriptions.forEach(description => {
    const allAttributeElement = document.createElement('div');
    allAttributeElement.classList.add('all-attribute');
    
    const descriptionElement = document.createElement('span');
    descriptionElement.classList.add('description');
    descriptionElement.textContent = description.description;
    
    const descriptionText = document.createElement('span');
    descriptionText.textContent = description.text;
  
    allAttributeElement.appendChild(descriptionText);
    allAttributeElement.appendChild(descriptionElement);
    descriptionContainer.appendChild(allAttributeElement);
  
    allAttributeElement.addEventListener('mouseenter', () => {
      hoverStart = new Date();
    });
  
    allAttributeElement.addEventListener('mouseleave', () => {
      const hoverEnd = new Date();
      const hoverTime = (hoverEnd - hoverStart) / 1000;
      hoverQuestion += hoverTime;
      console.log(hoverTime);
    });
  });
  
  
  
  
