/*------writing expressions with variables
js basics*/

console.log("Hola");

//ejercicio 1
var myName = "Camila";

console.log("Camila");

//ejercicio 2
var age = 24;

console.log(24);

//ejercicio 3
var ignasiAge = 32;

console.log(32);

var ageDiff = age - ignasiAge;

console.log(age - ignasiAge);

var older = 21;


//Writing code with conditionals

//ejercicio 4

if (age > older) {

  console.log("You are older than 21!")

}

//ejercicio 5
if (age > ignasiAge) {
  console.log("Ignasi is younger than you!")
}

else if (age < ignasiAge) {
  console.log("Ignasi is older than you!")
}

else if (age == ignasiAge) {
  console.log("You have the same age as Ignasi")
}

/*-----------------------------js array functions = sorting an array
ejercicio*/

var names = ["Laura", "Claudio", "Kevin", "Gemny", "Jennifer", "Marta", "Yuliet", "Camila", "Matías", "David"];

names.sort();

console.log(names[0]);

console.log(names[9]);

for (var i = 0; i < names.length; i++) {

  console.log(names[i]);
}


//ejercicio 2 looping over an array

var ages = [21, 24, 23, 38, 18, 19, 47, 34, 27, 30];
var i = 0;

/* while (ages < ages[i].length) {
	console.log(ages[i]);
	i++; 
}
 */
for(i = 0; i < ages.length ; i++) {

  if (ages[i] %2 == 0) {

    console.log(ages[i]);
  }
}

/* ejercicio 3 |funciones de los arrays|
número menor del array */

function numeroMasPequeño() {
  const arr = [3, 6, 67, 6, 23, 11, 17, 8, 93]
  const min = Math.min(...arr) 
  console.log(min) 
}
numeroMasPequeño(); //llamar la función fuera de las llaves para que se ejecute

/* ejercicio 4 
número mayor del array */

function numeroMasGrande() {
  const arr = [3, 6, 67, 6, 23, 11, 17, 8, 93]
  const max = Math.max(...arr)
  console.log(max)
}
numeroMasGrande(); 

/* ejercicio 5
número seleccionado (index) del array */

var array = [3, 6, 67, 6, 23, 11, 100, 8, 93, 0, 17, 24, 7, 1, 33, 45, 28, 33, 23, 12, 99, 100];
var index = 1;
printIndex (array, index);

function printIndex(array, index){
  console.log(array[index]);
}


/* ejercicio 6
imprimir números repetidos */

var array = [3, 6, 67, 6, 23, 11, 100, 8, 93, 0, 17, 24, 7, 1, 33, 45, 28, 33, 23, 12, 99, 100];
var repetidos = [];

for (var i = 0; i < array.length; i++) {
  for (var j = i + 1; j < array.length; j++) {
    if (array[i] == array[j] && !repetidos.includes(array[i])) {
      repetidos.push(array[i]);
      console.log(array[i]);
    }
  }
}

/* ejercicio 7
unir todos los elementos de un array en un string */

var myColor = ["Red", "Green", "White", "Black"];
myColor.toString();

myColorToString(myColor);

function myColorToString(array) {
  console.log(array)
}

/* ejercicio 1 de strings 
revertir un numero*/

x =  32443;

function reverse_the_string(num) {
  return String(num).split("").reverse().join("");
}

console.log(reverse_the_string(x));

/* ejercicio 2
revertir alfabeticamente una palabra */

function alphabet_order(str)
  {
return str.split('').sort().join('');
  }
console.log(alphabet_order("webmaster"));

/* ejercicio 3 
poner la primer letra de cada palabra en mayus*/

new String ("prince of persia");

function uppercase(str)
{
  var array1 = str.split(' ');
  var newArray1 = [];
    
  for(var x = 0; x < array1.length; x++){
      newArray1.push(array1[x].charAt(0).toUpperCase()+array1[x].slice(1));
  }
  return newArray1.join(' ');
}
console.log(uppercase("prince of persia"));

/* ejercicio 4
encontrar la palabra más larga de una oración */

new String ("Web Development Tutorial");

function longestWord(str)
{
  var array1 = str.match(/\w[a-z]{0,}/gi);
  var result = array1[0];

  for(var x = 1 ; x < array1.length ; x++)
  {
    if(result.length < array1[x].length)
    {
    result = array1[x];
    } 
  }
  return result;
}
console.log(longestWord("Web Development Tutorial"));


