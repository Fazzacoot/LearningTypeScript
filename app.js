//return type is infured the type of the function based on what it returns
//you can specify the type by doing (): type
function add(n1, n2) {
    return n1 + n2;
}
//type of void 
function printAnswer(num) {
    console.log("Result:" + num);
}
printAnswer(add(10, 23));
var combineValues;
combineValues = add;
console.log(combineValues(10, 10));
//let someUndefinedValue: undefined;
