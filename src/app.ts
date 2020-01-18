//Autobind decorator
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  //original method
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this); //this refers to the object that defines the getter
      return boundFn;
    }
  };
  return adjDescriptor;
}
//Autobind decorator

//Validation
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length >= validatableInput.minLength;
  }
  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length <= validatableInput.maxLength;
  }
  if (
    validatableInput.min != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  if (
    validatableInput.max != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  return isValid;
}
//Validation

//ProjectList
class ProjectList {
  templateEl: HTMLTemplateElement;
  appEl: HTMLDivElement;
  listEl: HTMLElement;
  constructor(private type: "active" | "finished") {
    // get template element
    this.templateEl = document.getElementById(
      "project-list"
    ) as HTMLTemplateElement;
    // get div where you want to render the code
    this.appEl = document.getElementById("app") as HTMLDivElement;
    //import the templates content and deep clone it - get all nested elements as well
    const importedNode = document.importNode(this.templateEl.content, true);
    //convert the templete from a fragment to an html element. in this case form el as we know it will be a form
    this.listEl = importedNode.firstElementChild as HTMLElement;
    //set id of the form
    this.listEl.id = `${this.type}-projects`;

    //call method
    this.attach();
    //call method
    this.renderContent();
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.listEl.querySelector("ul")!.id = listId;
    this.listEl.querySelector(
      "h2"
    )!.textContent = `${this.type.toUpperCase()} PROJECTS`;
  }

  private attach() {
    //insert the element into the main render div
    this.appEl.insertAdjacentElement("beforeend", this.listEl);
  }
}
//ProjectList

//ProjectForm
class ProjectForm {
  templateEl: HTMLTemplateElement;
  appEl: HTMLDivElement;
  formEl: HTMLFormElement;
  titleEl: HTMLInputElement;
  descriptionEl: HTMLInputElement;
  peopleEl: HTMLInputElement;
  constructor() {
    // get template element
    this.templateEl = document.getElementById(
      "project-input"
    ) as HTMLTemplateElement;
    // get div where you want to render the code
    this.appEl = document.getElementById("app") as HTMLDivElement;
    //import the templates content and deep clone it - get all nested elements as well
    const importedNode = document.importNode(this.templateEl.content, true);
    //convert the templete from a fragment to an html element. in this case form el as we know it will be a form
    this.formEl = importedNode.firstElementChild as HTMLFormElement;
    //set id of the form
    this.formEl.id = "user-input";

    //get all input fields from the element
    this.titleEl = this.formEl.querySelector("#title") as HTMLInputElement;
    this.descriptionEl = this.formEl.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleEl = this.formEl.querySelector("#people") as HTMLInputElement;

    //call method
    this.configure();
    //call method
    this.attach();
  }

  private gatherUserInput(): [string, string, number] | void {
    //get all input values
    const enteredTitle = this.titleEl.value;
    const enteredDescription = this.descriptionEl.value;
    const enteredPeople = this.peopleEl.value;
    //check if any are empty
    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true
    };
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5
    };
    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5
    };
    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert("Invalid Input");
      return;
    } else {
      //return tuple of values
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  //.bind(this) is needed to pass the correct context to the handler method
  //OR
  //you can use a decorator
  @Autobind
  private submintHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    //check if is array to see if all values are enterd
    if (Array.isArray(userInput)) {
      //destructure tuple to get values
      const [tite, desc, people] = userInput;
      console.log(tite, desc, people);
      this.clearInputs();
    }
  }

  private clearInputs() {
    this.titleEl.value = "";
    this.descriptionEl.value = "";
    this.peopleEl.value = "";
  }

  //adds event listener to form submit
  private configure() {
    this.formEl.addEventListener("submit", this.submintHandler);
  }

  private attach() {
    //insert the element into the main render div
    this.appEl.insertAdjacentElement("afterbegin", this.formEl);
  }
}
//ProjectForm

const projectForm = new ProjectForm();
const activeProjectList = new ProjectList("active");
const completedProjectList = new ProjectList("finished");