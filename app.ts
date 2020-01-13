//You can explisitly tell TS what values the object has
//const person: { name: string; age: number }

//TS infers the values here
const person = {
  name: "Faron",
  age: 24,
  hobbies: ["Video Games", "Coding"]
};

let favouriteActivities: string[];
favouriteActivities = ["Vide Games"];

console.log(person);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}
