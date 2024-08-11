// Step 1: Listen for the user to visit a website.
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        // Step 2: Check if the current website matches the intended website.
        if (tab.url.includes("example.com")) {
            // Step 3: If the website matches:
            // Step 3.1: Extract the hyperlinks from the webpage.
            chrome.tabs.executeScript(tabId, { file: 'extractHyperlinks.js' });
        }
    }
});

// Step 3.2: Create a list to store the extracted hyperlinks.
let hyperlinks = [];

// Step 3.3: For each hyperlink in the list:
function openTabsWithHyperlinks() {
    hyperlinks.forEach(function(link) {
        // Step 3.3.1: Open a new tab with the hyperlink.
        chrome.tabs.create({ url: link });
    });
}

// Step 3.4: For each opened tab:
chrome.tabs.onCreated.addListener(function(tab) {
    // Step 3.4.1: Execute function "clubsFixturesMatchlinks" to extract clubs, fixtures, and match links.
    chrome.tabs.executeScript(tab.id, { file: 'clubsFixturesMatchlinks.js' });
    
    // Step 3.4.2: Execute function "historyResultObjects" to extract historical match data and calculate statistics.
    chrome.tabs.executeScript(tab.id, { file: 'historyResultObjects.js' });
});

// Step 3.4.3: Get the list of objects returned by "historyResultObjects" representing calculated statistics.
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type == 'stats') {
        let statistics = message.data;
        // Step 3.4.4: If the number of objects is greater than one:
        if (statistics.length > 1) {
            // Step 3.4.4.1: Generate a random integer from 1 to the number of objects.
            let randomIndex = Math.floor(Math.random() * statistics.length);
            // Step 3.4.4.2: Select the object corresponding to the generated random integer.
            let selectedStatistic = statistics[randomIndex];
            console.log(selectedStatistic); // Example: Log the selected statistic
        }
        // Step 3.4.5: If the number of objects is one:
        else if (statistics.length == 1) {
            // Step 3.4.5.1: Do not make a selection.
            console.log(statistics[0]); // Example: Log the single statistic
        }
    }
});

// Step 4: End.
