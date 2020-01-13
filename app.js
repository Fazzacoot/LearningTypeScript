//You can explisitly tell TS what values the object has
//const person: { name: string; age: number }
//TS infers the values here
var person = {
    name: "Faron",
    age: 24,
    hobbies: ["Video Games", "Coding"]
};
var favouriteActivities;
favouriteActivities = ["Vide Games"];
console.log(person);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby.toUpperCase());
}
