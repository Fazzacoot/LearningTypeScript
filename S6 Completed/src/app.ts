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

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
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
  type: "bird";
  airSpeed: number;
}

interface Dog {
  type: "dog";
  landSpeed: number;
}

type Animal = Bird | Dog;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.airSpeed;
      break;
    case "dog":
      speed = animal.landSpeed;
      break;
  }
  console.log(`Speed ${speed}`);
}

moveAnimal({ type: "bird", airSpeed: 12 });
//Discriminated Unions

//type guards ends

//Type Casting
//Sets the type of a variable if TS can not infer the type
//2 type casting methods <> or as keyword
//! - means will never yial a null value, setting the type also tells TS that the value will not be null
// const userInputEl = <HTMLInputElement> document.getElementById("user-input")!;
const userInputEl = document.getElementById("user-input") as HTMLInputElement;
userInputEl.value = "Hello";
//Type Casting

//Index Properties
interface ErrorContainer {
  // index properties means you do not know how many properties there will be and their names
  //we know that each property has a name that is a string and is of type string
  [prop: string]: string;
  //must be the same type as the index propery
  // id: string;
}

const errorBag: ErrorContainer = {
  email: "Not a valid Email",
  username: "Must start with a capital letter"
};
//Index Properties

//Function overload
//adding the 2nd function tells TS that if it returns a number if the fucntion is of type number and string if of string
function addition(a: string, b: string): string;
function addition(a: number, b: number): number;
function addition(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const reslut = addition("Faron", "Gottlieb");
reslut.split(" ");
//Function overload

//Optional chaining
const fetchedUserData = {
  id: "frn",
  name: "Faron",
  job: { title: "CEO", description: "Owner" }
};
//? allows us to access nested properties that we are not sure will exist from an API or outside data source
// it lets TS know if the property exists continue to look at the next property and then fetch its value
console.log(fetchedUserData?.job?.title);
//Optional chaining

//Nullish Coalescing = ??
//?? = if null or undefined us the fallback value
//if you dont know if a value will be null or undefined but want it to have a defualt value
const userInput = null;
const storeData = userInput ?? "DEFAULT";

console.log(storeData);
//Nullish Coalescing
