// Step 1: Listen for the extension to be clicked.
chrome.browserAction.onClicked.addListener(function(tab) {
    // Step 2: If clicked:
    // Step 2.1: Open 4 new tabs.
    for (let i = 0; i < 4; i++) {
        chrome.tabs.create({ url: 'https://www.sportybet.com/ng/m/virtual/' + i });
    }
});

// Step 3: For each opened tab:
chrome.tabs.onCreated.addListener(function(tab) {
    // Step 3.1: Execute function "clubsFixturesMatchlinks" to extract clubs, fixtures, and match links.
    chrome.tabs.executeScript(tab.id, { file: 'clubsFixturesMatchlinks.js' });
    
    // Step 3.2: Execute function "historyResultObjects" to extract historical match data and calculate statistics.
    chrome.tabs.executeScript(tab.id, { file: 'historyResultObjects.js' });
});

// Step 3.3: Get the list of objects returned by "historyResultObjects" representing calculated statistics.
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type == 'stats') {
        let statistics = message.data;
        // Step 3.4: If the number of objects is greater than one:
        if (statistics.length > 1) {
            // Step 3.4.1: Generate a random integer from 1 to the number of objects.
            let randomIndex = Math.floor(Math.random() * statistics.length);
            // Step 3.4.2: Select the object corresponding to the generated random integer.
            let selectedStatistic = statistics[randomIndex];
            console.log(selectedStatistic); // Example: Log the selected statistic
        }
        // Step 3.5: If the number of objects is one:
        else if (statistics.length == 1) {
            // Step 3.5.1: Do not make a selection.
            console.log(statistics[0]); // Example: Log the single statistic
        }
    }
});
