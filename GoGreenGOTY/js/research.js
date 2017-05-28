//==================================================================//
// research.js
// - Handles progression
//==================================================================//

var researchedBuildings = new Array(6);

function initializeResearch() {
    for (var i = 0; i < 6; i++){
        researchedBuildings[i] = false;
    }
}

function research(key) {
    switch(key) {
        case 'wind':
            researchedBuildings[0] = true;
            break;
        case 'solar':
            researchedBuildings[1] = true;
            break;
        case 'coal':
            researchedBuildings[2] = true;
            break;
        case 'oil':
            researchedBuildings[3] = true;
            break;
        case 'hydro':
            researchedBuildings[4] = true;
            break;
        case 'nuclear':
            researchedBuildings[5] = true;
            break;
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