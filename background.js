//constants and variables
const Manager = {};
const xpaths = {
    EPL: "playlist_13104"
/*,
    Ligue1: "playlist_13122",
    Laliga: "playlist_13110",
    BundesLiga: "playlist_13116",
    SeriaA: "playlist_13113"
*/
};


chrome.runtime.onMessage.addListener((message)=>{
    if (message.command === "load"){
        //create 5 tabs go to url, create league manager class and push to dictionary obj
        for(let league in xpaths){
            chrome.tabs.create({url: message.url}, (newTab)=>{
                let League_ = new League_Manager(newTab.id, league, xpaths[league] );
                Manager[league] = League_;
            });
        }

        //settimeout click all see more then leagues
        setTimeout( click_, 30000);

        return false
    }
    if (message.command === "play"){
        //settimeout play function
        startup_();

        return false
    }
    if (message.command === "collate"){
        //isolate actual result
        let deserialResult = JSON.parse(message.data);
        let result = deserialResult.data;

        //process result
        //append to a list or push to popup.js

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
            info: {
                xpath: this.xpath,
                league: this.league,
                tabId: this.tabId
            }
        });
    }
    play_(){
        chrome.runtime.sendMessage({
            command: "step 1"
        });
    }
}


//sends msg to all tabs, to click leagues open
function click_(){
    for (let league in Manager){
        let Obj = Manager[league];

        console.log("Manager:");
        console.log(Obj);
        
        chrome.scripting.executeScript({
            target: {tabId: Obj.tabId},
            func: click_league,
            args: [ Obj.tabId, Obj.xpath, Obj.league ]
        });
    }
    console.log("injection complete");
}
//run the predicting alogorithm on all tabs
function startup_(){
    for (let league in Manager){
        let Obj = Manager[league];
        chrome.tabs.sendMessage(Obj.tabId, {
            command: "step 1"
        }, ()=>{console.log("sent")});
    }
   /*
    for (let league in Manager){
        let Obj = Manager[league];
        chrome.tabs.sendMessage(Obj.tabId, {
            command: "step 1"
        });
    }
    */
}


function click_league(tabId, xpath, league){
    //change DOM title
    document.getElementsByTagName('title')[0].innerText = league;

    //click league 
    xpath = "playlist_13104";
    element = document.getElementById(xpath);
    element.click();
}


/*
TO DO LIST:
verify click_ and startup_ message passing method
figure out how you want to organize collation in background
rearrange step 1
rearrange step 2
*/