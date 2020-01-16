//intefaces describe and pbject
//defines a structue but does not add values to the structure
interface Person {
  name: string;
  age: number;

  greet(phrase: string): void;
}

let person1: Person;

person1 = {
  name: "Faron",
  age: 24,
  greet(phrase:string){
    console.log(`${phrase} ${this.name}`)
  }
}

person1.greet('Hi there');
