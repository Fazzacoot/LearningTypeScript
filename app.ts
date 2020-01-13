function combine(
  input1: number | string,
  input2: number | string,
  resultType: "is-number" | "is-text"
) {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultType == "is-number"
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
  // if (resultType === "is-number") {
  //   return +result;
  // } else {
  //   return result.toString();
  // }
}

const combinedAges = combine(23, 10, "is-number");
console.log(combinedAges);

const combinedStringAges = combine("23", "10", "is-number");
console.log(combinedStringAges);

const combinedNames = combine("Faron", "Gottlieb", "is-text");
console.log(combinedNames);
