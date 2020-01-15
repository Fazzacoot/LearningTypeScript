//clss is our blueprint for out object
class Department {
  //Department properties
  name: string;

  //called when class is called and determines what values are needed when class is called
  constructor(n: string) {
    //sets name to the value passed in and returns in to our object
    this.name = n;
  }
}
//Department object
const development = new Department("Development");
console.log(development);
