/*
TS does not complain abour document,querySelector,addEventListener as the in tsconfig.js we do not specify the libs.
This means it will assume that we are developing for the browser and make avaliable all browser based elements
*/

//! (exclimation mark) tells TS that you know there is a button and not to complain
const button = document.querySelector("button") /*!*/;

function clickHandler(message: string) {
  console.log("Clicked" + message);
}

//Another solution is to wrap the button event listener in a truthy if statment
//then no ! is needed
if (button) {
  button.addEventListener("click", clickHandler.bind(null, 'You clicked it'));
}
