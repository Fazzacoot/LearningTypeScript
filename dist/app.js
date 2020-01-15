"use strict";
class Department {
    constructor(n) {
        this.name = n;
    }
    describe() {
        console.log("Department: " + this.name);
    }
}
const development = new Department("Development");
console.log(development);
development.describe();
const developmentCopy = { name: 'HR', describe: development.describe };
developmentCopy.describe();
//# sourceMappingURL=app.js.map