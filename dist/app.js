"use strict";
let add;
add = (n1, n2) => {
    return n1 + n2;
};
class Person {
    constructor(n) {
        this.age = 24;
        this.name = n;
    }
    greet(phrase) {
        console.log(`${phrase} ${this.name}`);
    }
}
let person1;
person1 = new Person("Faron");
person1.greet("Hi there");
console.log(person1);
//# sourceMappingURL=app.js.map