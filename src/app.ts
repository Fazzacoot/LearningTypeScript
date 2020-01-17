//Generics
//A type conneceted to another type Type<type>
const names: Array<string> = ["Faron", "Dean"]; // same as string[]

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Time Fired");
    reject("Rejected");
  }, 2000);
});

promise.then(data => {
  data.length;
});
//Generics

//Custom Generics
//T and U are dynamically set types that are inferred when the function is called based on values passed to the func
/*
You can set constraints that your generic types need to be based on
Using extends you can tell what type the Generic needs to be based on
We garentee the type that the function will recieve
*/
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
const mergedObj = merge({ name: "Faron" }, { age: 24 });
// const mergedObj = merge({ name: "Faron" }, 30);
console.log(mergedObj);
console.log(mergedObj.name);

interface Lengthy {
  length: number;
}

//we do not care whar property el is as long as we can get its length
function countAndDescribe<T extends Lengthy>(el: T): [T, string] {
  let description = "Got Value?";
  if (el.length > 0) {
    description = `Got ${el.length} element(s)`;
  }
  return [el, description];
}

console.log(countAndDescribe(["Hello", "there"]));
//Custom Generics

//keyof
//forces you to make sure that the object passed in has a key of the specified name
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return obj[key];
}
extractAndConvert({ name: "Faron" }, "name");
//keyof

//Generic Class
/*
If we do not care about the type of data we want intem to be but want it to be of only 
type number/string/object then we can make it a generic class
*/
class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if(this.data.indexOf(item) != -1){ //since obj is a referenc type it will return -1 and will remove only the last el
      this.data.splice(this.data.indexOf(item), 1);
    }

  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Faron");
textStorage.addItem("Dean");
textStorage.removeItem("Dean");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

const objStorage = new DataStorage<object>();
const deanObj = { name: "Dean" }
objStorage.addItem({ name: "Faron" });
objStorage.addItem(deanObj);
objStorage.removeItem(deanObj);
console.log(objStorage.getItems());


//Generic Class
