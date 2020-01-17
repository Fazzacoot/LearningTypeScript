//intersection types start
//combied 2 or more types together
//can be done with custom types or generic types
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type EvelvatedEmployee = Admin & Employee;

const e1: EvelvatedEmployee = {
  name: "Faron",
  privileges: ["db-admin"],
  startDate: new Date()
};

type Combinable = string | number;
type Numberic = number | boolean;

type Universal = Combinable & Numberic;
//intersection types end

//type guards start
function add(a: Combinable, b: Combinable) {
  //values in if == type guard. explicitly checks if 1+ values is of type string
  //typeof is checked at runtime
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;

function showEmployeeInfo(emp: UnknownEmployee) {
  console.log(`Name ${emp.name}`);
  //js that allows to to check if the property is in the object
  if ("privileges" in emp) {
    console.log(`Privleges: ${emp.privileges}`);
  }
  if ("startDate" in emp) {
    console.log(`Start Date: ${emp.startDate}`);
  }
}

showEmployeeInfo(e1);

class Car {
  drive() {
    console.log("Driving");
  }
}

class Truck {
  drive() {
    console.log("Driving Truck");
  }

  loadCargo(amount: number) {
    console.log(`Loading Cargo: ${amount}`);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVheicle(vehicle: Vehicle) {
  vehicle.drive();
  //checks if the vehicle is of the truck class
  //executes at run time
  //can us in as well here
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(2345);
  }
}

useVheicle(v1);
useVheicle(v2);

//Discriminated Unions
//type is a literal type that must equal that value this is the discriminated union value
interface Bird {
  type: 'bird',
  airSpeed:number;
}

interface Dog{
  type: 'dog',
  landSpeed: number
}

type Animal = Bird | Dog;

function moveAnimal(animal: Animal){
  let speed;
  switch(animal.type){
    case 'bird':
      speed = animal.airSpeed;
      break;
    case 'dog':
      speed = animal.landSpeed; 
    break; 
  }
  console.log(`Speed ${speed}` )
}

moveAnimal({type:'bird', airSpeed: 12})
//Discriminated Unions

//type guards ends
