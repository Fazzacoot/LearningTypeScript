//unkown means we do not know what type it will be
// unkown is better than any as it forces you to add extra type checks later on
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Faron";

//need an extra check if you use unknow
if (typeof userInput === "string") {
  userName = userInput;
}
