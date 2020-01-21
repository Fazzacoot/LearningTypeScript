//Drag & Drop Interaces
//export alows code to be accessable outside of this file

export interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}
export interface DragTarget {
  dragOverHandler(event: DragEvent): void; //signal is a valid drag targer
  dropHandler(event: DragEvent): void; //react to actual drop will permit the drop
  dragLeaveHandler(event: DragEvent): void; //useful to give visual feedback if reverting
}

//Drag & Drop Interaces
