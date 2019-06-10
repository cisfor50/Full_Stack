var dataMembers = data.results[0].members;

console.log(dataMembers);


var statistics = {
	"number_of_democrats": 0,
	"number_of_republicans": 0,
	"number_of_independents": 0,
	"total": 0,
	"democrats_average_votes_with_party": 0,
	"republicans_average_votes_with_party": 0,
	"independents_average_votes_with_party": 0,
	"total_average": 0,
	"least_engaged": [],
	"most_engaged": [],
	"least_loyal": [],
	"most_loyal": [],
};



//filtro miembros por partido
var senadoresD = dataMembers.filter(member => member.party == 'D');

var senadoresR = dataMembers.filter(member => member.party == 'R');

var senadoresI = dataMembers.filter(member => member.party == 'I');


//igualo los datos
statistics.number_of_democrats = senadoresD.length;

statistics.number_of_republicans = senadoresR.length;

statistics.number_of_independents = senadoresI.length;

statistics.total = dataMembers.length;



// % voted w party

senadoresD.forEach(e => {
	statistics.democrats_average_votes_with_party += e.votes_with_party_pct;
});

statistics.democrats_average_votes_with_party /= statistics.number_of_democrats;
statistics.democrats_average_votes_with_party = statistics.democrats_average_votes_with_party.toFixed(2);



senadoresR.forEach(e => {
	statistics.republicans_average_votes_with_party += e.votes_with_party_pct;
});

statistics.republicans_average_votes_with_party /= statistics.number_of_republicans;
statistics.republicans_average_votes_with_party = statistics.republicans_average_votes_with_party.toFixed(2);


senadoresI.forEach(e => {
	statistics.independents_average_votes_with_party += e.votes_with_party_pct;
});

statistics.independents_average_votes_with_party /= statistics.number_of_independents;
statistics.independents_average_votes_with_party = statistics.independents_average_votes_with_party.toFixed(2);

statistics.total_average = (parseInt(statistics.democrats_average_votes_with_party) + parseInt(statistics.republicans_average_votes_with_party) + parseInt(statistics.independents_average_votes_with_party)) / 3;

statistics.total_average = statistics.total_average.toFixed(2)

console.log(statistics.total_average);



//ordenar por porcentaje
//de menor a mayor

var least_engaged_S = dataMembers.sort((a, b) => (a.missed_votes_pct > b.missed_votes_pct ? 1 : -1));

statistics.least_engaged = least_engaged_S;



//de mayor a menor
var most_engaged_S = dataMembers.sort((a, b) => b.missed_votes - a.missed_votes);

statistics.most_engaged = most_engaged_S;






//tabla at glance

if (document.getElementById('senate-attendace')) {
	addTable();
}

var laTabla = document.getElementById('senate-attendance');

tableEl = addTable(statistics);

laTabla.innerHTML = tableEl;


function addTable(jsonStatistics) {

	var elHtml = '<thead class="thead-light"><tr><th>Party</th><th>No. of Reps</th><th>% Voted w/ party</th></tr></thead>';

	elHtml += '<tbody>';

	elHtml += '<tr>';
	elHtml += '<td>' + "<b>Democrats</b>" + '</td>';
	elHtml += '<td>' + jsonStatistics.number_of_democrats + '</td>';
	elHtml += '<td> % ' + jsonStatistics.democrats_average_votes_with_party + ' </td>';
	elHtml += '</tr>';
	elHtml += '<tr>';
	elHtml += '<td>' + "<b>Republicans</b>" + '</td>';
	elHtml += '<td>' + jsonStatistics.number_of_republicans + '</td>';
	elHtml += '<td> % ' + jsonStatistics.republicans_average_votes_with_party + '</td>';
	elHtml += '</tr>';
	elHtml += '<tr>';
	elHtml += '<td>' + "<b>Independents</b>" + '</td>';
	elHtml += '<td>' + jsonStatistics.number_of_independents + '</td>';
	elHtml += '<td> % ' + jsonStatistics.independents_average_votes_with_party + '</td>';
	elHtml += '</tr>';
	elHtml += '<tr>';
	elHtml += '<td>' + "<b>Total</b>" + '</td>';
	elHtml += '<td>' + jsonStatistics.total + '</td>';
	elHtml += '<td> % ' + jsonStatistics.total_average + '</td>';
	elHtml += '</tr>';

	elHtml += '</tbody>';

	return elHtml;
}



//&loyalty y attendance

function membersID (key, funcion2){
  
	var necesario = Math.round(dataMembers.length * 0.1) - 1;

	dataMembers.sort(funcion2);
	
	var valorNecesario = dataMembers[necesario][key];
	
	var orden =[];
	
	if (valorNecesario >= dataMembers[0][key]){
	  orden = dataMembers.filter(m => m[key] <= valorNecesario);
	}
	else{
	  orden = dataMembers.filter(m => m[key] >= valorNecesario);
	}
	
	return orden;
  }


//attendance porcentajes
  statistics["least_engaged"]= membersID ("missed_votes_pct" , (m1,m2)=> m2.missed_votes_pct - m1.missed_votes_pct);

  statistics["most_engaged"]= membersID ("missed_votes_pct" , (m1,m2)=> m1.missed_votes_pct - m2.missed_votes_pct);


//loyalty porcentajes
  statistics["least_loyal"]= membersID ("votes_with_party_pct" , (m1,m2)=> m1.votes_with_party_pct - m2.votes_with_party_pct);

  statistics["most_loyal"]= membersID ("votes_with_party_pct" , (m1,m2)=> m2.votes_with_party_pct - m1.votes_with_party_pct);




//Loyalty & Attendance Tables
//loyalty
var leastLoyalTable = statistics.least_loyal.map(function (x) {
	return "<tr><td><a href=\"" + x.url + "\">" + x.last_name + ", " + x.first_name + " " + (x.middle_name || "") + "</a></td><td>" + x.total_votes + "</td><td>" + x.votes_with_party_pct + " %</td></tr>"
})
$("#leastLoyal").html(leastLoyalTable);

var mostLoyalTable = statistics.most_loyal.map(function (x) {
	return "<tr><td><a href=\"" + x.url + "\">" + x.last_name + ", " + x.first_name + " " + (x.middle_name || "") + "</a></td><td>" + x.total_votes + "</td><td>" + x.votes_with_party_pct + " %</td></tr>"
})
$("#mostLoyal").html(mostLoyalTable);


//attendance
var leastEngagedTable = statistics.least_engaged.map(function (x) {
	return "<tr><td><a href=\"" + x.url + "\">" + x.last_name + ", " + x.first_name + " " + (x.middle_name || "") + "</a></td><td>" + x.missed_votes + "</td><td>" + x.missed_votes_pct + " %</td></tr>"
})
$("#leastEngaged").html(leastEngagedTable);

var mostEngagedTable = statistics.most_engaged.map(function (x) {
	return "<tr><td><a href=\"" + x.url + "\">" + x.last_name + ", " + x.first_name + " " + (x.middle_name || "") + "</a></td><td>" + x.missed_votes + "</td><td>" + x.missed_votes_pct + " %</td></tr>"
})
$("#mostEngaged").html(mostEngagedTable);
