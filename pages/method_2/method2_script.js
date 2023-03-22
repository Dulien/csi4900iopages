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

    addDragstartListeners();
    addTargetListeners();
}

function nextEmail() {
    toggleButton();
    currentEmail++;
    if (currentEmail > emailContent.length) {
        currentEmail = 1;
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

// Load the first email and its attributes
var currentEmail = 1;
loadEmailContent(currentEmail);
