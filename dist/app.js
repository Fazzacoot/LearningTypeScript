"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    static createEmployee(name) {
        return { name: name };
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    showEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
Department.companyYear = 2020;
class HRDepartment extends Department {
    constructor(id, managers) {
        super(id, "Human Resources");
        this.managers = managers;
    }
    describe() {
        console.log(`HR Department ID - (${this.id}): Name - ${this.name}`);
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
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment('ACC', []);
        return this.instance;
    }
    addEmployee(name) {
        if (name === "Faron") {
            return;
        }
        this.employees.push(name);
    }
    describe() {
        console.log(`Accounting Department ID - (${this.id}): Name - ${this.name}`);
    }
    addRepot(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    printRepots() {
        console.log(this.reports);
    }
}
const staticEmployee = Department.createEmployee("Tim");
console.log(staticEmployee, Department.companyYear);
const hr = new HRDepartment("HR", ["Meryl"]);
hr.addEmployee("Dean");
hr.addEmployee("Mark");
console.log(hr);
const accounting = AccountingDepartment.getInstance();
accounting.addRepot("This is a new report");
accounting.mostRecentReport = "New report";
accounting.addEmployee("Faron");
accounting.addEmployee("Dean");
console.log(accounting);
console.log(accounting.mostRecentReport);
accounting.describe();
//# sourceMappingURL=app.js.map