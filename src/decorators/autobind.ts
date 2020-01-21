namespace App {
  //Autobind decorator
  export function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
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
}
