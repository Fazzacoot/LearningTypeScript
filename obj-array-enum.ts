//You can explisitly tell TS what values the object has
//const person: { name: string; age: number }

//TS infers the values here
// const person = {
//   name: "Faron",
//   age: 24,
//   hobbies: ["Video Games", "Coding"],
//   role: [2, "Author"]
// };

//Becuase of Tuple we need to specify types otherwise we can not know what the tuples values need to be
// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string];
// } = {
//   name: "Faron",
//   age: 24,
//   hobbies: ["Video Games", "Coding"],
//   role: [2, "Author"]
// };

//Can assigne values to the enum values eg: ADMIN = 100 
//defualt starts at 0 and increments by 1
enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR
}

const person = {
  name: "Faron",
  age: 24,
  hobbies: ["Video Games", "Coding"],
  role: Role.ADMIN
};

let favouriteActivities: string[];
favouriteActivities = ["Vide Games"];

console.log(person);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}

if(person.role === Role.ADMIN){
  console.log('is admin');
}
