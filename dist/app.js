"use strict";
const names = ["Faron", "Dean"];
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Time Fired");
        reject("Rejected");
    }, 2000);
});
promise.then(data => {
    data.length;
});
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const mergedObj = merge({ name: "Faron" }, { age: 24 });
console.log(mergedObj);
console.log(mergedObj.name);
function countAndDescribe(el) {
    let description = "Got Value?";
    if (el.length > 0) {
        description = `Got ${el.length} element(s)`;
    }
    return [el, description];
}
console.log(countAndDescribe(["Hello", "there"]));
function extractAndConvert(obj, key) {
    return obj[key];
}
extractAndConvert({ name: "Faron" }, "name");
//# sourceMappingURL=app.js.map