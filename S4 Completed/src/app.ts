/*
All are global scoped
*/
//const - value can not be change. has global, functional and block scope
const Name = "Faron Gottlieb";
//let - value can be change. has global, functional and block scope
let myAge = 24;
//var -  value can be change. has global and functional
var hasHair = true;

//arrow functions
//default parameter values can be set in the parameter listing
//default parameter values need to be at the of the parameter list
const add = (a: number, b: number = 4) => {
  return a + b;
};
//short hand add
const shortHandAdd = (a: number, b: number) => a + b;
//single parameter does not requier () around values but needs to be told what t0 expect
const printOutput: (a: number | string) => void = output => console.log(output);

printOutput(add(12, 34));

//uses defualt value
printOutput(add(12));

/*
... (3 dots) called a spread opperator in this case is used to pull each individual 
value from the array as individual values
*/
const hobbies = ["Video Games", "Reading"];
const activeHobbies = ["Watching Netflix", ...hobbies];

activeHobbies.push(...hobbies);
console.log(activeHobbies);

//destructuring an array i.e pulling items out of the array
//values are coppied into new variabels/constants
const [hobby1, hobby2, ...remainingHobbies] = hobbies;
console.log(hobby1, hobby2, hobbies);

const person = {
  firstName: "Faron",
  age: 24
};

//this creates a perfect copt of the person object and not just the pointer that is in memeory
const copiedPerson = { ...person };

//destructuring an object i.e pulling items out of the array
//values are coppied into new variabels/constants
// firstName: userName overiding variable name to userName
const { firstName: userName, age } = person;
console.log(userName, age);
/*
... (3 dots) indicates a rest parameter in this case
this meas that multiAdd can accept any number of parameters as a number array
*/
const multiAdd = (...numbers: number[]) => {
  return numbers.reduce((result, value) => {
    return result + value;
  }, 0);
};

const addedNumbers = multiAdd(1, 5, 6, 4, 9, 4.4);
console.log(addedNumbers);
