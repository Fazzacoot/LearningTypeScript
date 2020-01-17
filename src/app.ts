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
function merge<T, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
const mergedObj = merge({ name: "Faron" }, { age: 24 });
console.log(mergedObj);
console.log(mergedObj.name);
//Custom Generics
