//return type is infured the type of the function based on what it returns
//you can specify the type by doing (): type
function add(n1, n2) {
    return n1 + n2;
}
function printAnswer(num) {
    console.log('Result:' + num);
}
printAnswer(add(10, 23));
