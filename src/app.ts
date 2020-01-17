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
//Custom Generics
