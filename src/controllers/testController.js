import validator from "validator";
import ProductModel from "../models/productModel.js";
function init(){
  let a= ProductModel.isValidId(4);
  console.log(a);
}
init();