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
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) != -1) {
            this.data.splice(this.data.indexOf(item), 1);
        }
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem("Faron");
textStorage.addItem("Dean");
textStorage.removeItem("Dean");
console.log(textStorage.getItems());
const numberStorage = new DataStorage();
const objStorage = new DataStorage();
const deanObj = { name: "Dean" };
objStorage.addItem({ name: "Faron" });
objStorage.addItem(deanObj);
objStorage.removeItem(deanObj);
console.log(objStorage.getItems());
//# sourceMappingURL=app.js.map