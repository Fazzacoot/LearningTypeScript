"use strict";
const Name = "Faron Gottlieb";
let myAge = 24;
var hasHair = true;
const add = (a, b = 4) => {
    return a + b;
};
const shortHandAdd = (a, b) => a + b;
const printOutput = output => console.log(output);
printOutput(add(12, 34));
printOutput(add(12));
const hobbies = ["Video Games", "Reading"];
const activeHobbies = ["Watching Netflix", ...hobbies];
activeHobbies.push(...hobbies);
console.log(activeHobbies);
const [hobby1, hobby2, ...remainingHobbies] = hobbies;
console.log(hobby1, hobby2, hobbies);
const person = {
    firstName: "Faron",
    age: 24
};
const copiedPerson = Object.assign({}, person);
const { firstName: userName, age } = person;
console.log(userName, age);
const multiAdd = (...numbers) => {
    return numbers.reduce((result, value) => {
        return result + value;
    }, 0);
};
const addedNumbers = multiAdd(1, 5, 6, 4, 9, 4.4);
console.log(addedNumbers);
//# sourceMappingURL=app.js.map