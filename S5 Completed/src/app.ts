//intefaces describe the structure of an object or a class or a function
//defines a structue but does not add values to the structure
interface Named {
  name: string;
  //? - means optional
  displayName?: string;
}
//interfactes can exted each other
//can extend multiple interfaces
interface Greetable extends Named {
  greet(phrase: string): void;
}

//type AddFn = (a: number, b: number) => number;
//custom function type instead of using the above
interface AddFn{
  (a: number, b: number): number;
}

let add: AddFn;
add = (n1: number, n2:number) => {
  return n1 + n2;
}

//can implement multiple interfaces
class Person implements Greetable {
  //? - can be added to optional as well
  readonly name: string;
  age = 24;

   //? - can be added to optional as well
  constructor(n: string) {
    this.name = n;
  }

  greet(phrase: string) {
    console.log(`${phrase} ${this.name}`);
  }
}

let person1: Greetable;

person1 = new Person("Faron");

person1.greet("Hi there");
console.log(person1);
