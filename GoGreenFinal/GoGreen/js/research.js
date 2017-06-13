//==================================================================//
// research.js
// - Handles progression of unlocks
//==================================================================//

var researchedBuildings = new Array(6);

var researchCostWind    = 25000;
var researchCostSolar   = 20000;
var researchCostCoal    = 0;
var researchCostOil     = 3000;
var researchCostHydro   = 20000;
var researchCostNuclear = 40000;

var totalResearched = 0;

var actionButtonIndex = new Array(6);

function getActButtonIndex(key){
    switch(key) {
        case 'wind':
            return actionButtonIndex[0];
            break;
        case 'solar':
            return actionButtonIndex[1];
            break;
        case 'coal':
            return actionButtonIndex[2];
            break;
        case 'oil':
            return actionButtonIndex[3];
            break;
        case 'hydro':
            return actionButtonIndex[4];
            break;
        case 'nuclear':
            return actionButtonIndex[5];
            break;
    }
}


function setActButtonIndex(key){
    switch(key) {
        case 'wind':
            actionButtonIndex[0] = totalResearched;
            break;
        case 'solar':
            actionButtonIndex[1] = totalResearched;
            break;
        case 'coal':
            actionButtonIndex[2] = totalResearched;
            break;
        case 'oil':
            actionButtonIndex[3] = totalResearched;
            break;
        case 'hydro':
            actionButtonIndex[4] = totalResearched;
            break;
        case 'nuclear':
            actionButtonIndex[5] = totalResearched;
            break;
    }
}

function getActButtonX(key) {
    switch(key) {
        case 'wind':
            return 1050;
            break;
        case 'solar':
            return 1050;
            break;
        case 'coal':
            return 950;
            break;
        case 'oil':
            return 950;
            break;
        case 'hydro':
            return 1150;
            break;
        case 'nuclear':
            return 1150;
            break;
    }
}

function getActButtonY(key) {
    switch(key) {
        case 'wind':
            return 1050;
            break;
        case 'solar':
            return 950;
            break;
        case 'coal':
            return 950;
            break;
        case 'oil':
            return 1050;
            break;
        case 'hydro':
            return 950;
            break;
        case 'nuclear':
            return 1050;
            break;
    }
}

function initializeResearch() {
    for (var i = 0; i < 6; i++){
        researchedBuildings[i] = false;
        actionButtonIndex[i] = -1;
    }
}

function researchCostFulfilled(key) {
    var costResearch = 0;
    switch(key) {
        case 'wind':
            costResearch = researchCostWind;
            break;
        case 'solar':
            costResearch = researchCostSolar;
            break;
        case 'coal':
            costResearch = researchCostCoal;
            break;
        case 'oil':
            costResearch = researchCostOil;
            break;
        case 'hydro':
            costResearch = researchCostHydro;
            break;
        case 'nuclear':
            costResearch = researchCostNuclear;
            break;
    }
    return money >= costResearch;
}

function research(key) {
    if (researchCostFulfilled(key)){
        switch(key) {
            case 'wind':
                if (researchedBuildings[0]) break;
                money -= researchCostWind;
                researchedBuildings[0] = true;
                setActButtonIndex(key);
                totalResearched += 1;
                windResearch.button.scale.setTo(0);
                //windResearch.kill();
                windResearchCostText.kill();
                hudResearchedWind.scale.setTo(.4);
                sfxPlay('sfxResearch', 1);
                break;
            case 'solar':
                if (researchedBuildings[1]) break;
                money -= researchCostSolar;
                researchedBuildings[1] = true;
                setActButtonIndex(key);
                totalResearched += 1;
                solarResearch.button.scale.setTo(0);
                //solarResearch.kill();
                solarResearchCostText.kill();
                hudResearchedSolar.scale.setTo(.4);
                sfxPlay('sfxResearch', 1);
                break;
            case 'coal':
                if (researchedBuildings[2]) break;
                money -= researchCostCoal;
                researchedBuildings[2] = true;
                setActButtonIndex(key);
                totalResearched += 1;
                coalResearch.button.scale.setTo(0);
                coalResearch.kill();
                sfxPlay('sfxResearch', 1);
                break;
            case 'oil':
                if (researchedBuildings[3]) break;
                money -= researchCostOil;
                researchedBuildings[3] = true;
                setActButtonIndex(key);
                totalResearched += 1;
                oilResearch.button.scale.setTo(0);
                //oilResearch.kill();
                oilResearchCostText.kill();
                hudResearchedOil.scale.setTo(.4);
                sfxPlay('sfxResearch', 1);
                break;
            case 'hydro':
                if (researchedBuildings[4]) break;
                money -= researchCostHydro;
                researchedBuildings[4] = true;
                setActButtonIndex(key);
                totalResearched += 1;
                hydroResearch.button.scale.setTo(0);
                //hydroResearch.kill();
                hydroResearchCostText.kill();
                hudResearchedHydro.scale.setTo(.4);
                sfxPlay('sfxResearch', 1);
                break;
            case 'nuclear':
                if (researchedBuildings[5]) break;
                money -= researchCostNuclear;
                researchedBuildings[5] = true;
                setActButtonIndex(key);
                totalResearched += 1;
                nuclearResearch.button.scale.setTo(0);
                //nuclearResearch.kill();
                nuclearResearchCostText.kill();
                hudResearchedNuclear.scale.setTo(.4);
                sfxPlay('sfxResearch', 1);
                break;
        }
    }
    else
    {
        console.log('cant research you poor loser');
        sfxPlay('sfxInvalid', 1);
    }

}

function isResearched(key) {
    switch(key) {
        case 'wind':
            return researchedBuildings[0];
            break;
        case 'solar':
            return researchedBuildings[1];
            break;
        case 'coal':
            return researchedBuildings[2];
            break;
        case 'oil':
            return researchedBuildings[3];
            break;
        case 'hydro':
            return researchedBuildings[4];
            break;
        case 'nuclear':
            return researchedBuildings[5];
            break;
    }
}
