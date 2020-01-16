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
        this.employees.push(employee);
    }
    showEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
class HRDepartment extends Department {
    constructor(id, managers) {
        super(id, "Human Resources");
        this.managers = managers;
    }
}
class AccountingDepartment extends Department {
    constructor(id, reports) {
        super(id, "Accounting");
        this.reports = reports;
        this.lastReport = reports[0];
    }
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error("No report found");
    }
    set mostRecentReport(value) {
        if (!value) {
            throw new Error("No valid value passed");
        }
        this.addRepot(value);
    }
    addEmployee(name) {
        if (name === "Faron") {
            return;
        }
        this.employees.push(name);
    }
    addRepot(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    printRepots() {
        console.log(this.reports);
    }
}
const development = new Department("DEV", "Development");
console.log(development);
development.describe();
development.addEmployee("Faron");
development.addEmployee("Dylan");
development.showEmployeeInformation();
const hr = new HRDepartment("HR", ["Meryl"]);
hr.addEmployee("Dean");
hr.addEmployee("Mark");
console.log(hr);
const accounting = new AccountingDepartment("ACC", []);
accounting.addRepot("This is a new report");
accounting.mostRecentReport = 'New report';
accounting.addEmployee("Faron");
accounting.addEmployee("Dean");
console.log(accounting);
console.log(accounting.mostRecentReport);
//# sourceMappingURL=app.js.map