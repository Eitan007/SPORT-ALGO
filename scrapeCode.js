
//const see_more = '//*[@id="main-content"]/dashboard-list-layout/div/page-home/home-list-layout/div[1]/div/gr-panel/div/custom-collapsable/div/div/div/gr-list/ul/gr-list-item';
const see_more = '[class="show-button ng-star-inserted"]';

var see_more_element = null;
var league_element = null;


if (message.command === "click"){
    //change the DOM title
    document.getElementsByTagName('title')[0].innerText = message.league;

    s = document.getElementById("playlist_13116").click()

   // setClickWithRetry(see_more, 3000); // Check every 1 second

    //click see more
    //wait_till_xpath_valid(see_more_element, see_more); //wait till element available
    //setclick(see_more, 20000);
/*
    //settime out to click particular xpath
    league_element = getElementByXpath(message.xpath);
    wait_till_xpath_valid(league_element, message.xpath); //wait till element available
    setclick(league_element, 15000);
*/
    return false
} 


//timeout click function
function setclick(selector, time){
    setTimeout(()=>{
        element = document.querySelector(selector);
        element.click();
    }, time);
}



async function wait_till_xpath_valid(element, xpath) {
    //wait if scanning is in progress
      return new Promise(resolve => {
        const interval_ = setInterval(() => {
          if (element){
            clearInterval(interval_);
            resolve();
          }else{
            element = getElementByXpath(xpath)
            console.log('updated element');
          }
        }, 2000);
      });
}

function setClickOnMutation(selector) {
    let observer = new MutationObserver((mutationsList, observer) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                let element = document.querySelector(selector);
                if (element) {
                    element.click();
                    observer.disconnect(); // Stop observing once clicked
                    return;
                }
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

// Usage:
//setClickOnMutation('.your-selector');


function setClickWithRetry(selector, interval) {
    let intervalId = setInterval(() => {
        let element = document.querySelector(selector);
        if (element) {
            clearInterval(intervalId);
            element.click();
        }
    }, interval);
}

// Usage:
