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
//# sourceMappingURL=app.js.map