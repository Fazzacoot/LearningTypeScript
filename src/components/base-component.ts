namespace App {
  //ComponentBase
  export abstract class Component<
    T extends HTMLElement,
    U extends HTMLElement
  > {
    templateEl: HTMLTemplateElement;
    hostEl: T;
    element: U;

    constructor(
      templateId: string,
      hostId: string,
      insertAtStart: boolean,
      newElId?: string
    ) {
      // get template element
      this.templateEl = document.getElementById(
        templateId
      ) as HTMLTemplateElement;
      // get div where you want to render the code
      this.hostEl = document.getElementById(hostId) as T;
      //import the templates content and deep clone it - get all nested elements as well
      const importedNode = document.importNode(this.templateEl.content, true);
      //convert the templete from a fragment to an html element. in this case form el as we know it will be a form
      this.element = importedNode.firstElementChild as U;
      //set id of the form
      if (newElId) {
        this.element.id = newElId;
      }

      this.attach(insertAtStart);
    }

    private attach(insertAtStart: boolean) {
      //insert the element into the main render div
      this.hostEl.insertAdjacentElement(
        insertAtStart ? "afterbegin" : "beforeend",
        this.element
      );
    }

    abstract configure(): void;
    abstract renderContent(): void;
  }
  //ComponentBase
}
