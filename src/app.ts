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
