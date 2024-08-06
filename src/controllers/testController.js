import validator from "validator";
import ProductModel from "../models/productModel.js";
function init(){
  const url ="https://localhost:8000/images/17daadb6-97d3-40bb-8321-8fd60eb2a0ac_test_product.jpg";
  let a = validator.isURL(url);
  console.log(a);
}
init();


