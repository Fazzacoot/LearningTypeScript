"use strict";
let person1;
person1 = {
    name: "Faron",
    age: 24,
    greet(phrase) {
        console.log(`${phrase} ${this.name}`);
    }
};
person1.greet('Hi there');
//# sourceMappingURL=app.js.map