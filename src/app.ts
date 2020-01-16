//class is our blueprint for out object
class Department {
  /*
  public - accessiable from anywhere
  private - accessiable from class only
  protected - accessiable from class and inherited classes
  */
  //Department properties
  // private readonly id: string;
  // private name: string;
  protected employees: string[] = []; //emplyees are only accesable inside Department as it is private

  //called when class is called and determines what values are needed when class is called
  /*
  private id: string, public name: string - shorthand means you do not need to specify the properties 
  at the top of the class
  */
  //readonly only initialized once and can not be changed after
  constructor(private readonly id: string, public name: string) {
    //sets name to the value passed in and returns in to our object
    // this.name = name;
    // this.id = id
  }

  //this: Department tells us that descripe expecs and instance of the class Department
  describe(this: Department) {
    //this refers to classes properties
    console.log(`Department (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  showEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

//Inheritance
class HRDepartment extends Department {
  managers: string[];
  constructor(id: string, managers: string[]) {
    //super calls the base class and requiers all parameters passed to it
    super(id, "Human Resources");
    this.managers = managers;
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  //get a value
  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found");
  }
  //set a value
  set mostRecentReport(value: string){
    if (!value) {
      throw new Error("No valid value passed");
    }
    this.addRepot(value);
  }

  constructor(id: string, private reports: string[]) {
    //super calls the base class and requiers all parameters passed to it
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  addEmployee(name: string) {
    if (name === "Faron") {
      return;
    }
    this.employees.push(name);
  }

  addRepot(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printRepots() {
    console.log(this.reports);
  }
}

//Department object
const development = new Department("DEV", "Development");
console.log(development);
development.describe();

development.addEmployee("Faron");
development.addEmployee("Dylan");
development.showEmployeeInformation();

//HR Department
const hr = new HRDepartment("HR", ["Meryl"]);
hr.addEmployee("Dean");
hr.addEmployee("Mark");
console.log(hr);

//Accounting Department
const accounting = new AccountingDepartment("ACC", []);


accounting.addRepot("This is a new report");
accounting.mostRecentReport = 'New report';
accounting.addEmployee("Faron");
accounting.addEmployee("Dean");
console.log(accounting);
console.log(accounting.mostRecentReport);


//returns undefined as this is not avaliabe
// const developmentCopy = {describe: development.describe};
// developmentCopy.describe();
// const developmentCopy = {name: 'HR', describe: development.describe};
// developmentCopy.describe();
