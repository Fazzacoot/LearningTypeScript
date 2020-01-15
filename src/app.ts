//clss is our blueprint for out object
class Department {
  //Department properties
  // private readonly id: string;
  // private name: string;
  private employees: string[] = []; //emplyees are only accesable inside Department as it is private

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
    this, this.employees.push(employee);
  }

  showEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}
//Department object
const development = new Department("DEV", "Development");
console.log(development);
development.describe();

development.addEmployee("Faron");
development.addEmployee("Dylan");
development.showEmployeeInformation();

//returns undefined as this is not avaliabe
// const developmentCopy = {describe: development.describe};
// developmentCopy.describe();
// const developmentCopy = {name: 'HR', describe: development.describe};
// developmentCopy.describe();
