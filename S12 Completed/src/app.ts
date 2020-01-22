//ts cant see normal js libraries
//need @types npm package to define its types
import _ from "lodash";

import "reflect-metadata";
//map json object to class
import { plainToClass } from "class-transformer";
import {validate} from "class-validator";
import { Product } from "./product.model";

console.log(_.shuffle([1, 2, 3]));

//tells TS that this variable exists in JS
declare var GLOBAL: any;
console.log(GLOBAL);

const products = [
  { title: "TV", price: 3999 },
  { title: "Video Game", price: 899 }
];
const newProd = new Product('', -100);
validate(newProd).then(errors =>{
  if(errors.length > 0){
    console.log('Errors');
    console.log(errors);
  }
  else{
    console.log(newProd.getInformation())
  }
})
//manual maping
// const loadedProducts = products.map(prod =>{
//   return new Product(prod.title, prod.price);
// })
const loadedProducts = plainToClass(Product,products)

// const prod = new Product("Video Game", 899);
for (const prod of loadedProducts){
  console.log(prod.getInformation());
}