//importing namespace - only exisit in the typescript scope
//tells TS where to find the code but in JS it can find the code
//set outFile to tell TS to create one file in the tsconfig
///<reference path="./components/project-form.ts"/>
///<reference path="./components/project-item.ts"/>
///<reference path="./components/project-list.ts"/>

namespace App {
  new ProjectForm();
  new ProjectList("active");
  new ProjectList("finished");
}
