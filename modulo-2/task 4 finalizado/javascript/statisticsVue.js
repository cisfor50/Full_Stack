//para poder implementar las distintas url -> poner id en los bodys de las senates

if (document.getElementById('senate-data')) {
    var url = "https://api.propublica.org/congress/v1/113/senate/members.json";
} else {
    var url = "https://api.propublica.org/congress/v1/113/house/members.json";
}


var dataMembers = [];
var statistics = {};

var app = new Vue({
    el: '#app',
    data: {
        vueStatistics: {},
    }
});

fetch(url, {

    method: "GET",
    headers: {
        "X-API-Key": "4cI0SxmMNXQYh8EDNGONWIFEU1EUaMcf8pt0xNTl"
    }
})
    .then(resp => resp.json())
    .then(data => {
        dataMembers = data.results[0].members
    })
    .then(function () {
        saveStatistics()
    })
    .catch(error => console.log(error));


var republicansData = [];
var democratsData = [];
var independentsData = [];

function saveStatistics() {
    statistics =
        {
            number_of_democrats: 0,
            number_of_republicans: 0,
            number_of_independents: 0,
            total: 0,

            democrats_average_votes_with_party: 0,
            republicans_average_votes_with_party: 0,
            independents_average_votes_with_party: 0,
            total_average: 0,

            least_engaged: [],
            most_engaged: [],
            least_loyal: [],
            most_loyal: []
        }

    fillParties();
    matchData();
    averagePerParty();
    orderPercentage();

    app.vueStatistics = statistics;
}


function fillParties() {

    for (i = 0; i < dataMembers.length; i++) 
    {
        if (dataMembers[i].party == 'R') {
            republicansData.push(dataMembers[i]);
        } 
        else if (dataMembers[i].party == 'D') {
            democratsData.push(dataMembers[i]);
        } 
        else if (dataMembers[i].party == 'I') {
            independentsData.push(dataMembers[i]);
        }
    }
}

function matchData() {

    statistics.number_of_democrats = democratsData.length;
    statistics.number_of_republicans = republicansData.length;
    statistics.number_of_independents = independentsData.length;
    statistics.total = democratsData.length + republicansData.length + independentsData.length;
}

function averagePerParty() {

    for (i = 0; i < dataMembers.length; i++) {

        if (dataMembers[i].party == 'D') {
            statistics.democrats_average_votes_with_party += + (dataMembers[i].votes_with_party_pct / statistics.number_of_democrats).toFixed(2)
        } 
        else if (dataMembers[i].party == 'R') {
            statistics.republicans_average_votes_with_party += + (dataMembers[i].votes_with_party_pct / statistics.number_of_republicans).toFixed(2)
        } 
        else if (dataMembers[i].party == 'I') {
            statistics.independents_average_votes_with_party += + (dataMembers[i].votes_with_party_pct / statistics.number_of_independents).toFixed(2)
        }
    }

    if (statistics.independents_average_votes_with_party == 0) {
        
        statistics.total_average += +(statistics.democrats_average_votes_with_party + statistics.republicans_average_votes_with_party + statistics.independents_average_votes_with_party).toFixed(2) / 2 
    } 
    else {
        statistics.total_average += +(statistics.democrats_average_votes_with_party + statistics.republicans_average_votes_with_party + statistics.independents_average_votes_with_party).toFixed(2) / 3
    }
}



function orderPercentage() {
   
    // La función Math.trunc() retorna la parte entera de un numero al remover cualquier dígito fraccionario.

    dataMembers.sort(function (a, b) {
        return b.missed_votes_pct - a.missed_votes_pct
    })
    for (i = 0; i < Math.trunc(dataMembers.length / 10); i++) { 
        statistics.least_engaged[i] = dataMembers[i]
    }

   
    dataMembers.sort(function (a, b) {

        return a.missed_votes_pct - b.missed_votes_pct
    })
    for (i = 0; i < Math.trunc(dataMembers.length / 10); i++) { 

        statistics.most_engaged[i] = dataMembers[i]
    }

    dataMembers.sort(function (a, b) {

        return a.votes_with_party_pct - b.votes_with_party_pct
    })
    for (i = 0; i < Math.trunc(dataMembers.length / 10); i++) {

        statistics.least_loyal[i] = dataMembers[i]
    }

    dataMembers.sort(function (a, b) {

        return b.votes_with_party_pct - a.votes_with_party_pct
    })

    for (i = 0; i < Math.trunc(dataMembers.length / 10); i++) {

        statistics.most_loyal[i] = dataMembers[i]
    }
}