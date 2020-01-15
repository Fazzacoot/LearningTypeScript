"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    describe() {
        console.log(`Department (${this.id}): ${this.name}`);
    }
    addEmployee(employee) {
        this, this.employees.push(employee);
    }
    showEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
const development = new Department("DEV", "Development");
console.log(development);
development.describe();
development.addEmployee("Faron");
development.addEmployee("Dylan");
development.showEmployeeInformation();
//# sourceMappingURL=app.js.map