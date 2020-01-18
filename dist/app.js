"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Logger(logString) {
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
function WithTemplate(template, hookId) {
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor(..._) {
                super();
                console.log("WithTemplate");
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector("h1").textContent = this.name;
                }
            }
        };
    };
}
let Person = class Person {
    constructor() {
        this.name = "Faron";
        console.log("Created Person");
    }
};
Person = __decorate([
    Logger("Logging Person"),
    WithTemplate("<h1>My Person Obj</h1>", "app")
], Person);
const person = new Person();
console.log(person);
function ProductLogger(target, propertyName) {
    console.log("Property decorator");
    console.log(target);
    console.log(propertyName);
}
function ProductAccessorLogger(target, name, descriptor) {
    console.log("Accessor decorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function MethodLogger(target, name, descriptor) {
    console.log("Method decorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function ParameterLogger(target, name, position) {
    console.log("Parameter decorator");
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error("Invalid Price - price < 0 is not allowed");
        }
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    ProductLogger
], Product.prototype, "title", void 0);
__decorate([
    ProductAccessorLogger
], Product.prototype, "price", null);
__decorate([
    MethodLogger,
    __param(0, ParameterLogger)
], Product.prototype, "getPriceWithTax", null);
//# sourceMappingURL=app.js.map