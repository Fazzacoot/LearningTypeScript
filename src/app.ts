//Decorators - for meta programming
//useful to help other devs use your code
//Decorators are functions
//Decorators are executed on class defenition
//@function name to call decorator

//Decorators on a class take 1 argument - the constructor of the class
function Logger(constructor: Function){
  console.log('Logging');
  console.log(constructor);
}

@Logger
class Person {
  name = 'Faron';

  constructor(){
    console.log('Created Person')
  }
}

const person = new Person();
console.log(person);
//Decorators
