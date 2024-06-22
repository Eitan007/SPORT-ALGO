chrome.runtime.onMessage.addListener((message)=>{
    if (message.command === "click"){
        //run click functions
        return false
    } 
    if (message.command === "step 1"){
        //run step 1
        //setinterval step2()
        return false
    } 
});

function step1(){
    //step 1 logic
}
function step2(){
    //step 2 logic
    //collate()
}
function collate_(){
    //collate function
}