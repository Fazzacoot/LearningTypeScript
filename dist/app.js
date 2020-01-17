"use strict";
const e1 = {
    name: "Faron",
    privileges: ["db-admin"],
    startDate: new Date()
};
function add(a, b) {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
}
function showEmployeeInfo(emp) {
    console.log(`Name ${emp.name}`);
    if ("privileges" in emp) {
        console.log(`Privleges: ${emp.privileges}`);
    }
    if ("startDate" in emp) {
        console.log(`Start Date: ${emp.startDate}`);
    }
}
showEmployeeInfo(e1);
class Car {
    drive() {
        console.log("Driving");
    }
}
class Truck {
    drive() {
        console.log("Driving Truck");
    }
    loadCargo(amount) {
        console.log(`Loading Cargo: ${amount}`);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVheicle(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(2345);
    }
}
useVheicle(v1);
useVheicle(v2);
function moveAnimal(animal) {
    let speed;
    switch (animal.type) {
        case "bird":
            speed = animal.airSpeed;
            break;
        case "dog":
            speed = animal.landSpeed;
            break;
    }
    console.log(`Speed ${speed}`);
}
moveAnimal({ type: "bird", airSpeed: 12 });
const userInputEl = document.getElementById("user-input");
userInputEl.value = "Hello";
const errorBag = {
    email: "Not a valid Email",
    username: "Must start with a capital letter"
};
//# sourceMappingURL=app.js.map