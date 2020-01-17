//intersection types
//combied 2 or more types together
//can be done with custom types or generic types
type Admin = {
  name: string;
  privilages: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type EvelvatedEmployee = Admin & Employee;

const e1: EvelvatedEmployee = {
  name: "Faron",
  privilages: ["db-admin"],
  startDate: new Date()
};

type Combinable = string | number;
type Numberic = number | boolean;

type Universal = Combinable & Numberic;
//intersection types
