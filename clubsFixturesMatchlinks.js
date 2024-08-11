function clubsFixturesMatchlinks() {
  
    ////// STEP 1: GET THE CLUBS PLAYING THIS SEASON AND THE FIXTURES FOR THE WEEK
    
    
    
    function getElementByXpath(path) {
      return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
    
    
    
    //expand fixtures
    for (n = 2; n < 3; n++){
        john = '//*[@id="main-content"]/dashboard-list-layout/div/page-football/page-football-league/div/football-event-main-market[' + n + ']/gr-panel/div/gr-header/div/div/div/div/div/div[1]/panel-collapse-icon'
        setTimeout(getElementByXpath(john).click(), 1300);
    }
    
    
    
    
    
    
    //Get clubs names from the table using classname
    var teamER = document.getElementsByClassName('col-xs-4 ellipsis');
    Clubs = {};
    Clubs2 = {};
    for (var i = 0; i < teamER.length; i++ ){
        club = teamER[i].textContent;
        club = club.split(" ")[1];
        Clubs[club] = "0";   
    }
    for (var i = 0; i < teamER.length; i++ ){
        tablePostm = teamER[i].textContent;
        tablePost = tablePostm.split(".")[0];
        club = tablePostm.split(" ")[1];
        Clubs2[club] = tablePost;   
    }
    
    
    //FIXTURES FOR THE WEEK
    
    //pick elements
    function getElementByXpath(path) {
      return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }
    x = getElementByXpath('//*[@id="main-content"]/dashboard-list-layout/div/page-football/page-football-league/div/football-event-main-market[1]');
    y = getElementByXpath('//*[@id="main-content"]/dashboard-list-layout/div/page-football/page-football-league/div/football-event-main-market[2]');
    
    //pick week number
    x1 = x.getElementsByTagName('gr-header');
    y1 = y.getElementsByTagName('gr-header');
    
    //get first week text
    weekman = x1[0].textContent.split(' ')[1] + ' ' + x1[0].textContent.split(' ')[2];
    
    //get second week text
    weekman2 = y1[0].textContent.split(' ')[1] + ' ' + y1[0].textContent.split(' ')[2];
    
    //pick fixtures for each week
    x2 = x.getElementsByClassName('team-names col-xs-12');
    y2 = y.getElementsByClassName('team-names col-xs-12');
    
    //unpack fixtures
    MATCHES = [];
    MATCHES2 = []; 
    for (var i = 0; i < x2.length; i++ ){
        match = x2[i].textContent;
        homeMatch = match.split(" ")[1];
        awayMatch = match.split(" ")[3];
        teames = [];
        teames.push(homeMatch);
        teames.push(awayMatch);
        MATCHES.push(teames);
    }
    for (var i = 0; i < y2.length; i++ ){
        match = y2[i].textContent;
        homeMatch = match.split(" ")[1];
        awayMatch = match.split(" ")[3];
        teames = [];
        teames.push(homeMatch);
        teames.push(awayMatch);
        MATCHES2.push(teames);
    }
    FIXTURES = {week1 : MATCHES, week2 : MATCHES2};
    
    
    
    
    //click history tab
    histor = '//*[@id="main-content"]/dashboard-list-layout/div/page-football/page-football-league/div/gr-header/div/div/div/div/div/div[2]/span';
    getElementByXpath(histor).click();
    
    //////STEP 1
    
    }
    
    