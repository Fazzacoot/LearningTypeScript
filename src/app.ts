//Decorators - for meta programming
//useful to help other devs use your code
//Decorators are functions
//Decorators are executed on class defenition
//@function name to call decorator

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
function Logger(logString: string) {
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  return function(constructor: any) {
    //_ = aware of argument but i dont need it
    console.log("WithTemplate");
    const hookEl = document.getElementById(hookId);
    const person = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector("h1")!.textContent = person.name;
    }
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
class Product {
  //Decorators on properties take 2 arguments - the target and the
  @ProductLogger
  title: string;
  private _price: number;

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

  getPriceWithTax(tax: number) {
    return this._price * (1 + tax);
  }
}

// const product = new Product('Food', 0);
// product.price = 100
// console.log(product);
//Property Decorators
