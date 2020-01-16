//intefaces describe the structure of an object or a class
//defines a structue but does not add values to the structure
interface Greetable {
  name: string;
  greet(phrase: string): void;
}

//can implement multiple interfaces
class Person implements Greetable {
  readonly name: string;
  age = 24;

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
