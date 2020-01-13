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
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
})(Role || (Role = {}));
var person = {
    name: "Faron",
    age: 24,
    hobbies: ["Video Games", "Coding"],
    role: Role.ADMIN
};
var favouriteActivities;
favouriteActivities = ["Vide Games"];
console.log(person);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
}
if (person.role === Role.ADMIN) {
    console.log('is admin');
}
