var members = [];

var app = new Vue({
	el: '#app',
	data: {
		filteredMembers: [],
		listOfStates: [],
	}
});

if (document.title === "Senate Attendance") {
  url = 'https://api.propublica.org/congress/v1/113/senate/members.json'
} 
else if (document.title === "House Attendance") {
   url = 'https://api.propublica.org/congress/v1/113/house/members.json'
} 


fetch(url, { 
		method: "GET",
		headers: {
			"X-API-Key": '4cI0SxmMNXQYh8EDNGONWIFEU1EUaMcf8pt0xNTl'
		}
	})	
	.then( resp => resp.json())
  .then( data => {
	members = data.results[0].members;
	filterTable();
	createDropdown(members);
  })
.catch(error =>console.log(error));



  
function filterTable() {

	var checkedBoxes = Array.from(document.querySelectorAll('input[name=party]:checked'));
	var state = document.querySelector('select').value
	checkboxes = ["R", "D", "I"]
	checkedBoxes = checkedBoxes.map(element => element.value);
	app.filteredMembers = members.filter(members => checkedBoxes.includes(members.party) && (state == "" ? true : members.state == state));
}



function createDropdown(members) {	
	 var states =  members.map(member => member.state).filter((value, index, arr) => {
		return states = arr.indexOf(value) === index;
		
	}).sort();

	app.listOfStates = states;
}





