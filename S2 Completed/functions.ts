//return type is infured the type of the function based on what it returns
//you can specify the type by doing (): type
function add(n1: number, n2: number) {
  return n1 + n2;
}

//type of void
function printAnswer(num: number) {
  console.log("Result:" + num);
}

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

printAnswer(add(10, 23));

//Function Types
//accept a function that takes 2 number perameters and return a number
let combineValues: (x: number, y: number) => number;

combineValues = add;

console.log(combineValues(10, 10));

//let someUndefinedValue: undefined;

addAndHandle(6,3,(result)=>{
  console.log(result)
})
