
document.getElementById("senate-data").innerHTML = JSON.stringify(data,null,2);

"use strict";

//creación de tabla

if (document.getElementById('senate-data')) {
	createSenateTable();
} else if(document.getElementById('house-data')) {
	createHouseTable();
}
 
var members = data.results[0].members;
createDropDown(members); //funcion definida para crear el menu de los estados

function createSenateTable(){
	
	var elSenateTable = document.getElementById('senate-data');
 
	tableEl = addTableToHTML(data.results[0].members);
	
	elSenateTable.innerHTML = tableEl;
	
}
 
 function createHouseTable(){
	
	var elSenateTable = document.getElementById('senate-data');
 
  tableEl = addTableToHTML(filtrarMiembros(data.results[0].members));
  //funcion filtrarMiembros definida al final, ejecuta el filtro de miembros cuando se selecciona un boton
	
	elSenateTable.innerHTML = tableEl;
	
}
  
function addTableToHTML(membersArray){
 
	var elHtml = '<thead class="thead-light"><tr><th>Full Name</th><th>Party</th><th>State </th><th>Seniority</th><th>Percentage of votes with party</th></tr></thead>';
 
	elHtml += '<tbody>';
	
	membersArray.forEach(function (member) {
		elHtml += '<tr>';
 
		if (member.middle_name === null) {
			elHtml += '<td><a href="' + member.url + '">' + member.first_name + ' ' + member.last_name + '</td>';
		} else {
			elHtml += '<td><a href="' + member.url + '">' + member.first_name + ' ' + member.middle_name + ' ' + member.last_name + '</a></td>';
		}
		elHtml += '<td>' + member.party + '</td>';
 
		elHtml += '<td>' + member.state + '</td>';
 
		elHtml += '<td>' + member.seniority + '</td>';
 
		elHtml += '<td> % ' + member.votes_with_party_pct + '</td>';
 
		elHtml += '</tr>';
	});
 
	elHtml += '</tbody>';
	
	return elHtml;
}


function createDropDown(members){
 
  var members = members.map(member => member.state).filter((value, index, arr) => {

    return arr.indexOf(value) === index;
  }).sort();
  
  var output = '<option value="">All</option>';

  members.forEach(member => {
   output += `

   <option value=${member}>${member}</option>}`;


  });
  
  document.querySelector("#select-state").innerHTML = output;
}




//la funcion filtrarMiembros se posiciona en la linea 4867
// se aplica en la creación de la tabla para que el filtro funcione desde allí

function filtrarMiembros (membersArray){

  var chequearValores = Array.from(document.querySelectorAll('input[name=party]:checked')).map(check => check.value);
  
  //chequearValores selecciona los inputs del html que estan nombrados como "party", itera con map y luego devuelve un array con los valores R, D, I
  
  var state = document.querySelector('select').value
  
  //el querySelector solo toma el primer elemento, en este caso el select de html y luego el valor
  
  var miembrosFiltrados = membersArray.filter(members => chequearValores.includes(members.party) && 
  (state == "" ? true: members.state == state));
  
  //compara el array que retorna chequearValores (R,D,I) y pregunta si members.party es verdadero
  //para mostrar el miembro que corresponda en cuanto Estado y Partido 
  
  return miembrosFiltrados;
  }