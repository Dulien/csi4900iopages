function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var targetId = ev.target.id;

    if (data === targetId) {
        return;
    }
    
    // Check if the dragged attribute matches the correct email portion
    if (data === targetId.replace("-target", "")) {
        checkCompletion();
        // Highlight the correct email portion in green
        ev.target.style.backgroundColor = "lime";
        ev.target.style.padding = "3px";

        // Disable the draggable attribute
        var draggable = document.getElementById(data);
        draggable.setAttribute("draggable", "false");
        draggable.style.opacity = "0.5";
        draggable.style.cursor = "not-allowed";
    }
}

function resetDraggableAttributes() {
    const draggableElements = document.querySelectorAll(".draggable");
    for (const draggable of draggableElements) {
        draggable.setAttribute("draggable", "true");
        draggable.style.opacity = "1";
        draggable.style.cursor = "move";
    }
}

function addTargetListeners() {
    const targets = document.querySelectorAll("*");
    for (const target of targets) {
        target.addEventListener("drop", drop);
        target.addEventListener("dragover", allowDrop);
    }
}

function addDragstartListeners() {
    const draggables = document.querySelectorAll(".draggable");
    for (const draggable of draggables) {
        draggable.addEventListener("dragstart", drag);
    }
}

function checkCompletion() {
    const draggableElements = document.querySelectorAll(".draggable");
    let completed = true;

    for (const draggable of draggableElements) {
        if (draggable.getAttribute("draggable") === "true") {
            completed = false;
            break;
        }
    }

    if (completed) {
        var button = document.getElementById("next-email");
        button.style.visibility = "visible";
    }
}

function loadEmailContent(emailNumber) {
    var button = document.getElementById("next-email");
    button.style.visibility = "hidden";

    var container = document.getElementById("email-container");
    container.innerHTML = "";

    // Load the email content from the emailContent array
    container.innerHTML = emailContent[emailNumber - 1].content;

    // Load the available attributes for the current email
    var attributesContainer = document.getElementById("attributes");
    attributesContainer.innerHTML = "";
    
    emailContent[emailNumber - 1].attributes.forEach((attribute) => {
        var attributeDiv = document.createElement("div");
        attributeDiv.className = "hover-text draggable";
        attributeDiv.setAttribute("draggable", "true");
        attributeDiv.id = attribute.id;
        attributeDiv.textContent = attribute.text;
        attributesContainer.appendChild(attributeDiv);
    });

    var allAttributesSection = document.getElementById("all-attributes");
    allAttributesSection.innerHTML = "";

    emailContent[currentEmail - 1].attributes.forEach((attribute) => {
        const attributeDiv = document.createElement("div");
        attributeDiv.className = "all-attribute";
        attributeDiv.textContent = attribute.text;
        attributeDiv.id = "hint";
    
        const descriptionDiv = document.createElement("div");
        descriptionDiv.className = "description";
        descriptionDiv.innerHTML = attribute.description;
        
        // Add mouseover and mouseout event listeners
        attributeDiv.addEventListener("mouseover", onMouseOver);
        attributeDiv.addEventListener("mouseout", onMouseOut);
    
        attributeDiv.appendChild(descriptionDiv);
        allAttributesSection.appendChild(attributeDiv);
      });

    addDragstartListeners();
    addTargetListeners();

}

function nextEmail() {
    toggleButton();
    var timeSpent = Date.now() - questionStart;
    answersCSV.push(timeSpent/1000);
    answersCSV.push(hoverQuestion);
    totalHover += hoverQuestion;
    hoverQuestion = 0;

    currentEmail++;
    if (currentEmail > emailContent.length) {
        const testTimeSpent = Date.now() - testStart;
        answersCSV.push(testTimeSpent/1000);
        answersCSV.push(totalHover);
        finalAnswerCSV.push(["Q1T","Q1H","Q2T","Q2H","Q3T","Q3H","Q4T","Q4H","Q5T","Q5H","Q6T","Q6H","Q7T","Q7H","Q8T","Q8H","TotalT","TotalH"]);
        finalAnswerCSV.push(answersCSV);
        const jsonString = JSON.stringify(finalAnswerCSV);
        const encodedParam = encodeURIComponent(jsonString);
        answers.push("Quiz Complete. Total time spent: " + testTimeSpent / 1000 + " seconds");
        alert(answers.join("\n"));
        window.location.href = 'comments.html?data=' + encodedParam;
    }
    loadEmailContent(currentEmail);
    resetDraggableAttributes();
}

function toggleButton() {
    var button = document.getElementById("next-email");
    if (button.style.visibility === "hidden") {
        button.style.visibility = "visible";
    } else {
        button.style.visibility = "hidden";
    }
}

var answers = [];
var answersCSV = [];
var finalAnswerCSV = [];
var hoverTimes = []

var questionStart = Date.now();
var testStart = Date.now();
var hoverStart = 0;
var hoverQuestion = 0;
var totalHover = 0;


// Load the first email and its attributes
var currentEmail = 1;
loadEmailContent(currentEmail);

function onMouseOver() {
    hoverStart = new Date();
}

function onMouseOut() {
    const hoverEndTime = new Date();
    const hoverDuration = (hoverEndTime - hoverStart) / 1000; // Convert to seconds
    hoverQuestion += hoverDuration;
    console.log(`Hover duration: ${hoverDuration.toFixed(2)} seconds`);
}