//clss is our blueprint for out object
class Department {
  //Department properties
  name: string;

  //called when class is called and determines what values are needed when class is called
  constructor(n: string) {
    //sets name to the value passed in and returns in to our object
    this.name = n;
  }

  //this: Department tells us that descripe expecs and instance of the class Department
  describe(this: Department) {
    //this refers to classes properties
    console.log("Department: " + this.name);
  }
}
//Department object
const development = new Department("Development");
console.log(development);
development.describe();

//returns undefined as this is not avaliabe
// const developmentCopy = {describe: development.describe};
// developmentCopy.describe();
const developmentCopy = {name: 'HR', describe: development.describe};
developmentCopy.describe();