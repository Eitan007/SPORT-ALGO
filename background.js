//constants and variables
const Manager = {};
const xpaths = {}

chrome.runtime.onMessage.addListener((message)=>{
    if (message.command === "collate"){
        return false
    }
    if (message.command === "load"){
        //create 5 tabs go to url, create league manager class and push to list
        //settimeout click all see more then leagues
        //settimeout activate function
        return false
    }
    if (message.command === "play"){
        //settimeout play function
        //
        return false
    }
});

class League_Manager{
    constructor(tabId, league, xpath){
        this.tabId = tabId;
        this.league = league;
        this.xpath = xpath;
    }
    activate_(){
        chrome.runtime.sendMessage({
            command: "click",
            target: xpath
        });
    }
    play_(){
        chrome.runtime.sendMessage({
            command: "step 1"
        });
    }
}

