"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
function validate(validatableInput) {
    let isValid = true;
    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (validatableInput.minLength != null &&
        typeof validatableInput.value === "string") {
        isValid =
            isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null &&
        typeof validatableInput.value === "string") {
        isValid =
            isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null &&
        typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null &&
        typeof validatableInput.value === "number") {
        isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
}
class ProjectList {
    constructor(type) {
        this.type = type;
        this.templateEl = document.getElementById("project-list");
        this.appEl = document.getElementById("app");
        const importedNode = document.importNode(this.templateEl.content, true);
        this.listEl = importedNode.firstElementChild;
        this.listEl.id = `${this.type}-projects`;
        this.attach();
        this.renderContent();
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.listEl.querySelector("ul").id = listId;
        this.listEl.querySelector("h2").textContent = `${this.type.toUpperCase()} PROJECTS`;
    }
    attach() {
        this.appEl.insertAdjacentElement("beforeend", this.listEl);
    }
}
class ProjectForm {
    constructor() {
        this.templateEl = document.getElementById("project-input");
        this.appEl = document.getElementById("app");
        const importedNode = document.importNode(this.templateEl.content, true);
        this.formEl = importedNode.firstElementChild;
        this.formEl.id = "user-input";
        this.titleEl = this.formEl.querySelector("#title");
        this.descriptionEl = this.formEl.querySelector("#description");
        this.peopleEl = this.formEl.querySelector("#people");
        this.configure();
        this.attach();
    }
    gatherUserInput() {
        const enteredTitle = this.titleEl.value;
        const enteredDescription = this.descriptionEl.value;
        const enteredPeople = this.peopleEl.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true
        };
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const peopleValidatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        };
        if (!validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)) {
            alert("Invalid Input");
            return;
        }
        else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }
    submintHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [tite, desc, people] = userInput;
            console.log(tite, desc, people);
            this.clearInputs();
        }
    }
    clearInputs() {
        this.titleEl.value = "";
        this.descriptionEl.value = "";
        this.peopleEl.value = "";
    }
    configure() {
        this.formEl.addEventListener("submit", this.submintHandler);
    }
    attach() {
        this.appEl.insertAdjacentElement("afterbegin", this.formEl);
    }
}
__decorate([
    Autobind
], ProjectForm.prototype, "submintHandler", null);
const projectForm = new ProjectForm();
const activeProjectList = new ProjectList("active");
const completedProjectList = new ProjectList("finished");
//# sourceMappingURL=app.js.map