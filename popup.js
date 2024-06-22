var load_btn = document.getElementById('load');
var play_btn = document.getElementById('play');
var messageDisplay = document.getElementById('display');


// Listen for messages from the background script
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === 'display prediction') {
        displayMessage(message.text);
    }
});

// Function to display a message in the popup
function displayMessage(message) {
    let messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageDisplay.appendChild(messageElement);
}
function loaD(){
    //send load signal
    chrome.runtime.sendMessage({
        command: "load"
    });
}
function plaY(){
    //send play signal
    chrome.runtime.sendMessage({
        command: "play"
    });
}

// Attach click event listener to the send button
load_btn.addEventListener('click', loaD);
play_btn.addEventListener('click', plaY);
