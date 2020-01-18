//Decorators - for meta programming
//useful to help other devs use your code
//Decorators are functions
//Decorators are executed on class defenition
//@function name to call decorator
//_ = aware of argument but i dont need it

//Decorators on a class take 1 argument - the constructor of the class
//Standerd Decorator decleration
// function Logger(constructor: Function){
//   console.log('Logging');
//   console.log(constructor);
// }
//Standerd Decorator decleration

//Decorator Factory
/*
function rules apply so  Logger executes before  WithTemplate
but the decorator function executes the other way around
*/

/**
 * Class, Method, Accessor decorators can return values
 */
function Logger(logString: string) {
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

// new constructor function replaces original constructor function
//this means that only when we insanciate an obj of the class we execute the code
function WithTemplate(template: string, hookId: string) {
  return function<T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log("WithTemplate");
        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.name;
        }
      }
    }; // constructor function
  };
}
//Decorator Factory

//Standerd Decorator call
// @Logger
//Standerd Decorator call
//Decorator Factory call
// @Logger('Logging Person') // executes a function that returs a decorator function
//Decorator Factory call
@Logger("Logging Person")
@WithTemplate("<h1>My Person Obj</h1>", "app")
class Person {
  name = "Faron";

  constructor() {
    console.log("Created Person");
  }
}

const person = new Person();
console.log(person);
//Decorators

//Property Decorators
function ProductLogger(target: any, propertyName: string | Symbol) {
  console.log("Property decorator");
  console.log(target);
  console.log(propertyName);
}

function ProductAccessorLogger(
  target: any,
  name: string,
  descriptor: PropertyDescriptor
) {
  console.log("Accessor decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function MethodLogger(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function ParameterLogger(target: any, name: string | Symbol, position: number) {
  console.log("Parameter decorator");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  //Decorators on properties take 2 arguments - the target and the propertyName
  @ProductLogger
  title: string;
  private _price: number;

  //Decorators on accessor take 3 arguments - the target, the name and the descriptor
  @ProductAccessorLogger
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid Price - price < 0 is not allowed");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  //Decorators on method take 3 arguments - the target, the name and the descriptor
  @MethodLogger
  getPriceWithTax(@ParameterLogger tax: number) {
    //Decorators on argument take 3 arguments - the target, the name and the position
    return this._price * (1 + tax);
  }
}
//Property Decorators

//Auto Bind Decorator

//overides old methods descriptor to this one
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this); //this refers to the object that defines the getter
      return boundFn;
    }
  };
  return adjDescriptor;
}
class Printer {
  message = "This works";
  @Autobind
  showMessage() {
    console.log(this.message);
  }
}
const printer = new Printer();

const button = document.querySelector("button")!;
button.addEventListener("click", printer.showMessage);
//Auto Bind Decorator

//Validation with Decorators
interface ValidatorConfig {
  [property: string]: {
    [validProps: string]: string[]; // ['requied' , true]
  };
}

const registerValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registerValidators[target.constructor.name] = {
    ...registerValidators[target.constructor.name],
    [propName]: ["required"]
  };
}

function PositiveNumber(target: any, propName: string) {
  registerValidators[target.constructor.name] = {
    ...registerValidators[target.constructor.name],
    [propName]: ["positive"]
  };
}

function validate(obj: any) {
  const objectValidatorConfig = registerValidators[obj.constructor.name];
  if (!obj) {
    return true;
  }
  let isValid = true;
  for (const prop in objectValidatorConfig) {
    for (const validator of objectValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", event => {
  event.preventDefault();

  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createCourse = new Course(title, price);

  if (!validate(createCourse)) {
    alert("Invalid Input");
    return;
  }
  console.log(createCourse);
});
//Validation with Decorators
