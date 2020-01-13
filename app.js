function combine(input1, input2, resultType) {
    var result;
    if ((typeof input1 === "number" && typeof input2 === "number") ||
        resultType == "is-number") {
        result = +input1 + +input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
    // if (resultType === "is-number") {
    //   return +result;
    // } else {
    //   return result.toString();
    // }
}
var combinedAges = combine(23, 10, "is-number");
console.log(combinedAges);
var combinedStringAges = combine("23", "10", "is-number");
console.log(combinedStringAges);
var combinedNames = combine("Faron", "Gottlieb", "is-text");
console.log(combinedNames);
