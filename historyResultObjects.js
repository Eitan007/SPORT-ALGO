

function historyResultObjects() {

    /////////////// STEP 2
    
    
    
    
    function getElementByXpath(path) {
      return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
    
    
    
    
    //expand all history
    for(n = 2; n < 11; n++){
        john = '//*[@id="main-content"]/dashboard-list-layout/div/page-football/page-football-history/div/gr-panel' + '[' + n + ']' + '/div/gr-header/div/div/div/div/div/div[1]/panel-collapse-icon'
        setTimeout(getElementByXpath(john).click(), 1300);        
        }
    
    //Get elements containing history scores using classname
    var oTable = document.getElementsByClassName('grid grid-middle title-center ng-star-inserted');
    TeamData = [];
    for (var i = 0; i < oTable.length; i++){
        matchData = oTable[i].textContent.split(" ");
        teamsData = {team1 : matchData[1], team2 : matchData[5], score1 : matchData[2], score2: matchData[4]};
        TeamData.push(teamsData);
    }
    
    
    //MAKE CALCULATIONS
    //Group history according to each club
    for (const key of Object.keys(Clubs)){
        clubHistory ={"history" : "0", "homeP" : "0", "AwayP" : "0" , "Table_Position" : "0"};
        HOMEhistoryArr = [];
        AwayhistoryArr = [];
        for (var j = 0; j < TeamData.length; j++){        
            if (key == TeamData[j].team1){
                HOMEhistoryArr.push(TeamData[j]);
            }
            else if (key == TeamData[j].team2){
                AwayhistoryArr.push(TeamData[j]);
            }
            else{
                continue;
            }
        }
        hometeamScore = [];
        hometeamConcede = [];
        awayteamScore = [];
        awayteamConcede = [];
    
        
        var hometeamScore = [];
        var hometeamConcede = [];
        var awayteamScore = [];
        var awayteamConcede = [];
        homeArr = HOMEhistoryArr.slice(0,5);
        m = 0;
        n = 0;
        for (var i = 0; i < homeArr.length; i++) {
            if (parseInt(HOMEhistoryArr[i].score1) > 0 && m < 5) {
                hometeamScore.push(1);
                m += 1;
            }else{m += 1;}
            if (parseInt(HOMEhistoryArr[i].score2) > 0 && n < 2) {
                hometeamConcede.push(1);
                n += 1;
            }else{n += 1;}
        }
        awayArr = AwayhistoryArr.slice(0,5);
        p = 0;
        q = 0;
        for (var i = 0; i < awayArr.length; i++) {
            if (parseInt(AwayhistoryArr[i].score1) > 0 && p < 5) {
                awayteamConcede.push(1);
                p += 1;
            }else{p += 1;}
            if (parseInt(AwayhistoryArr[i].score2) > 0 && q < 2) {
                awayteamScore.push(1);
                q += 1;
            }else{q += 1;}
        }
    
        var sumH = hometeamScore.reduce((acc, val) => acc + val, 0);
        var sumA = awayteamScore.reduce((acc, val) => acc + val, 0);
        var sumHc = hometeamConcede.reduce((acc, val) => acc + val, 0);
        var sumAc = awayteamConcede.reduce((acc, val) => acc + val, 0);
    
            
        clubHistory["history"] = [HOMEhistoryArr, AwayhistoryArr]; 
        clubHistory["homeP"] = sumH;
        clubHistory["AwayP"] = sumA;
        clubHistory["AwayconcP"] = sumAc;
        clubHistory["homeconcP"] = sumHc;
        for (const key2 of Object.keys(Clubs2)){
            if (key == key2){
                clubHistory["Table_Position"] = Clubs2[key2];
            }else{}
    
        }
        Clubs[key] = clubHistory;
    
    }
    
    
    //CALCULATE POWER FOR SELECTED WEEK'S FIXTURE
    
    //define each week list
    result = [];
    result2 = [];
    
    //iterate throught first week and get match strength
    for (var i = 0; i < MATCHES.length; i++){
        var home = MATCHES[i][0];  
        var away = MATCHES[i][1];
        var homescore = Clubs[home].homeP;
        var homeConcede = Clubs[home].homeconcP;
        var awayscore = Clubs[away].AwayP;
        var awayConcede = Clubs[away].AwayconcP;
        var scoreStr = ((homescore + homeConcede + awayscore + awayConcede)/14)*100;
        result.push(scoreStr);
       }
    
    //iterate throught second week and get match strength
    for (var i = 0; i < MATCHES2.length; i++){
        var home = MATCHES2[i][0];  
        var away = MATCHES2[i][1];
        var homescore = Clubs[home].homeP;
        var homeConcede = Clubs[home].homeconcP;
        var awayscore = Clubs[away].AwayP;
        var awayConcede = Clubs[away].AwayconcP;
        var scoreStr = ((homescore + homeConcede + awayscore + awayConcede)/14)*100;
        result2.push(scoreStr);
       }
    
    //Print first week matches above 79%
    console.log(weekman);
    for (var i = 0; i < MATCHES.length; i++){
        if (result[i] > 79 && result[i] < 100){
            T1 = Clubs[MATCHES[i][0]].Table_Position;
            T2 = Clubs[MATCHES[i][1]].Table_Position;
            console.log(T1 + " " + MATCHES[i][0] + " vs " + MATCHES[i][1] + " " + T2 + " " + " ==> " + result[i].toFixed(2))
        }
    }
    
    //Print second week matches above 79%
    console.log(' ');
    console.log(weekman2);
    for (var i = 0; i < MATCHES2.length; i++){
        if (result2[i] > 79 && result2[i] < 100){
            T3 = Clubs[MATCHES2[i][0]].Table_Position 
            T4 = Clubs[MATCHES2[i][1]].Table_Position
            console.log(T3 + " " + MATCHES2[i][0] + " vs " + MATCHES2[i][1] + " " + T4 + " " + " ==> " + result2[i].toFixed(2))
        }
    }
    
    ////////////// STEP 2
    
    }
    