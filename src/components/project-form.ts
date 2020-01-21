///<reference path="base-component.ts"/>
///<reference path="../decorators/autobind.ts"/>
///<reference path="../util/validation.ts"/>
///<reference path="../state/project-state.ts"/>

namespace App {
  //ProjectForm
  export class ProjectForm extends Component<HTMLDivElement, HTMLFormElement> {
    titleEl: HTMLInputElement;
    descriptionEl: HTMLInputElement;
    peopleEl: HTMLInputElement;
    constructor() {
      super("project-input", "app", true, "user-input");
      //get all input fields from the element
      this.titleEl = this.element.querySelector("#title") as HTMLInputElement;
      this.descriptionEl = this.element.querySelector(
        "#description"
      ) as HTMLInputElement;
      this.peopleEl = this.element.querySelector("#people") as HTMLInputElement;
      //call method
      this.configure();
    }
    //adds event listener to form submit
    configure() {
      this.element.addEventListener("submit", this.submintHandler);
    }

    renderContent() {}

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
        projectState.addProjects(tite, desc, people);
        console.log(tite, desc, people);
        this.clearInputs();
      }
    }

    private clearInputs() {
      this.titleEl.value = "";
      this.descriptionEl.value = "";
      this.peopleEl.value = "";
    }
  }
  //ProjectForm
}
