var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define("models/drag-drop", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("components/base-component", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Component {
        constructor(templateId, hostId, insertAtStart, newElId) {
            this.templateEl = document.getElementById(templateId);
            this.hostEl = document.getElementById(hostId);
            const importedNode = document.importNode(this.templateEl.content, true);
            this.element = importedNode.firstElementChild;
            if (newElId) {
                this.element.id = newElId;
            }
            this.attach(insertAtStart);
        }
        attach(insertAtStart) {
            this.hostEl.insertAdjacentElement(insertAtStart ? "afterbegin" : "beforeend", this.element);
        }
    }
    exports.Component = Component;
});
define("models/project", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus = exports.ProjectStatus || (exports.ProjectStatus = {}));
    class Project {
        constructor(id, title, description, people, status) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.people = people;
            this.status = status;
        }
    }
    exports.Project = Project;
});
define("decorators/autobind", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.Autobind = Autobind;
});
define("state/project-state", ["require", "exports", "models/project"], function (require, exports, project_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class State {
        constructor() {
            this.listeners = [];
        }
        addListener(listenerFn) {
            this.listeners.push(listenerFn);
        }
    }
    class ProjectState extends State {
        constructor() {
            super();
            this.projects = [];
        }
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            return (this.instance = new ProjectState());
        }
        addProjects(title, description, people) {
            const newProject = new project_1.Project(Math.random().toString(), title, description, people, project_1.ProjectStatus.Active);
            this.projects.push(newProject);
            this.updateListeners();
        }
        moveProject(projectId, newStatus) {
            const project = this.projects.find(prj => prj.id === projectId);
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners();
            }
        }
        updateListeners() {
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice());
            }
        }
    }
    exports.ProjectState = ProjectState;
    exports.projectState = ProjectState.getInstance();
});
define("components/project-item", ["require", "exports", "components/base-component", "decorators/autobind"], function (require, exports, base_component_js_1, autobind_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ProjectItem extends base_component_js_1.Component {
        constructor(hostId, project) {
            super("single-project", hostId, false, project.id);
            this.project = project;
            this.configure();
            this.renderContent();
        }
        get persons() {
            if (this.project.people === 1) {
                return "1 person";
            }
            else {
                return `${this.project.people} persons`;
            }
        }
        dragStartHandler(event) {
            event.dataTransfer.setData("text/plain", this.project.id);
            event.dataTransfer.effectAllowed = "move";
        }
        dragEndHandler(_) {
            console.log("Drag End");
        }
        configure() {
            this.element.addEventListener("dragstart", this.dragStartHandler);
            this.element.addEventListener("dragend", this.dragEndHandler);
        }
        renderContent() {
            this.element.querySelector("h2").textContent = this.project.title;
            this.element.querySelector("h3").textContent = `${this.persons} assigned`;
            this.element.querySelector("p").textContent = this.project.description;
        }
    }
    __decorate([
        autobind_js_1.Autobind
    ], ProjectItem.prototype, "dragStartHandler", null);
    exports.ProjectItem = ProjectItem;
});
define("components/project-list", ["require", "exports", "components/base-component", "models/project", "decorators/autobind", "state/project-state", "components/project-item"], function (require, exports, base_component_js_2, project_js_1, autobind_js_2, project_state_js_1, project_item_js_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ProjectList extends base_component_js_2.Component {
        constructor(type) {
            super("project-list", "app", false, `${type}-projects`);
            this.type = type;
            this.assignedProjects = [];
            this.configure();
            this.renderContent();
        }
        dragOverHandler(event) {
            if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
                event.preventDefault();
                const listEl = this.element.querySelector("ul");
                listEl.classList.add("droppable");
            }
        }
        dropHandler(event) {
            const projId = event.dataTransfer.getData("text/plain");
            project_state_js_1.projectState.moveProject(projId, this.type === "active" ? project_js_1.ProjectStatus.Active : project_js_1.ProjectStatus.Finished);
        }
        dragLeaveHandler(_) {
            const listEl = this.element.querySelector("ul");
            listEl.classList.remove("droppable");
        }
        configure() {
            this.element.addEventListener("dragover", this.dragOverHandler);
            this.element.addEventListener("dragleave", this.dragLeaveHandler);
            this.element.addEventListener("drop", this.dropHandler);
            project_state_js_1.projectState.addListener((projects) => {
                const revevantProjects = projects.filter(proj => {
                    if (this.type === "active") {
                        return proj.status === project_js_1.ProjectStatus.Active;
                    }
                    return proj.status === project_js_1.ProjectStatus.Finished;
                });
                this.assignedProjects = revevantProjects;
                this.renderProjects();
            });
        }
        renderContent() {
            const listId = `${this.type}-projects-list`;
            this.element.querySelector("ul").id = listId;
            this.element.querySelector("h2").textContent = `${this.type.toUpperCase()} PROJECTS`;
        }
        renderProjects() {
            const listEl = document.getElementById(`${this.type}-projects-list`);
            listEl.innerHTML = "";
            for (const item of this.assignedProjects) {
                new project_item_js_1.ProjectItem(`${this.type}-projects-list`, item);
            }
        }
    }
    __decorate([
        autobind_js_2.Autobind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        autobind_js_2.Autobind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        autobind_js_2.Autobind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    exports.ProjectList = ProjectList;
});
define("util/validation", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
    exports.validate = validate;
});
define("components/project-form", ["require", "exports", "components/base-component", "util/validation", "decorators/autobind", "state/project-state"], function (require, exports, base_component_js_3, validation_js_1, autobind_js_3, project_state_js_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ProjectForm extends base_component_js_3.Component {
        constructor() {
            super("project-input", "app", true, "user-input");
            this.titleEl = this.element.querySelector("#title");
            this.descriptionEl = this.element.querySelector("#description");
            this.peopleEl = this.element.querySelector("#people");
            this.configure();
        }
        configure() {
            this.element.addEventListener("submit", this.submintHandler);
        }
        renderContent() { }
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
            if (!validation_js_1.validate(titleValidatable) ||
                !validation_js_1.validate(descriptionValidatable) ||
                !validation_js_1.validate(peopleValidatable)) {
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
                project_state_js_2.projectState.addProjects(tite, desc, people);
                console.log(tite, desc, people);
                this.clearInputs();
            }
        }
        clearInputs() {
            this.titleEl.value = "";
            this.descriptionEl.value = "";
            this.peopleEl.value = "";
        }
    }
    __decorate([
        autobind_js_3.Autobind
    ], ProjectForm.prototype, "submintHandler", null);
    exports.ProjectForm = ProjectForm;
});
define("app", ["require", "exports", "components/project-list", "components/project-form"], function (require, exports, project_list_1, project_form_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new project_form_1.ProjectForm();
    new project_list_1.ProjectList("active");
    new project_list_1.ProjectList("finished");
});
//# sourceMappingURL=bundle.js.map