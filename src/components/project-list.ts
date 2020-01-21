///<reference path="base-component.ts"/>
///<reference path="../decorators/autobind.ts"/>
///<reference path="../models/drag-drop.ts"/>
///<reference path="../state/project-state.ts"/>
///<reference path="../models/project.ts"/>
namespace App {
  //ProjectList
  export class ProjectList extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget {
    assignedProjects: Project[];
    constructor(private type: "active" | "finished") {
      super("project-list", "app", false, `${type}-projects`);
      this.assignedProjects = [];

      this.configure();
      this.renderContent();
    }

    @Autobind
    dragOverHandler(event: DragEvent): void {
      if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
        event.preventDefault();
        const listEl = this.element.querySelector("ul")!;
        listEl.classList.add("droppable");
      }
    }
    @Autobind
    dropHandler(event: DragEvent): void {
      const projId = event.dataTransfer!.getData("text/plain");
      projectState.moveProject(
        projId,
        this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
      );
    }
    @Autobind
    dragLeaveHandler(_: DragEvent): void {
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.remove("droppable");
    }

    configure() {
      this.element.addEventListener("dragover", this.dragOverHandler);
      this.element.addEventListener("dragleave", this.dragLeaveHandler);
      this.element.addEventListener("drop", this.dropHandler);
      //call listener
      projectState.addListener((projects: Project[]) => {
        const revevantProjects = projects.filter(proj => {
          if (this.type === "active") {
            return proj.status === ProjectStatus.Active;
          }
          return proj.status === ProjectStatus.Finished;
        });
        this.assignedProjects = revevantProjects;
        this.renderProjects();
      });
    }
    renderContent() {
      const listId = `${this.type}-projects-list`;
      this.element.querySelector("ul")!.id = listId;
      this.element.querySelector(
        "h2"
      )!.textContent = `${this.type.toUpperCase()} PROJECTS`;
    }

    private renderProjects() {
      const listEl = document.getElementById(
        `${this.type}-projects-list`
      ) as HTMLUListElement;
      listEl.innerHTML = "";
      for (const item of this.assignedProjects) {
        new ProjectItem(`${this.type}-projects-list`, item);
      }
    }
  }
  //ProjectList
}
