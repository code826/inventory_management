import path from 'path';
import validator from 'validator';

import ProductModel from '../models/productModel.js';
import { error } from 'console';

// export function getAllProducts(req,res){
//     return res.sendFile(path.join(path.resolve(),'src','views','products.html'));
// }

export default class ProductsController{
    getAllProducts(req,res){
        //return res.sendFile(path.join(path.resolve(),'src','views','products.html'));
       let products1 = ProductModel.getProducts();
       return  res.render('products',{title:'Product',products:products1});
    }
    addNewProducts(req,res){
        return res.render('product-create');
    }
    addNewProductSave(req,res){
        //get the data
      const {name,desc,price,imageUrl} = req.body;

        //validate the data
      let errorMssg = null;
      let errors = [];
      //3@1
    //   if(!name || name.length < 4 || !validator.isAlpha(name)){
    //     errorMssg = "Name Should Be  A Valid Alphanumeric Of Min 3 Character";
    //   }
      if(!name){
        errorMssg = "Name Is Not Valid";
        errors.push(errorMssg);
       // return res.render('product-create',{errorMssg:errorMssg});
      }

      if(name.length < 4){
        errorMssg = `Name Should Have min 3 character you have given ${name.length}`;
        errors.push(errorMssg);
      }

      if(!validator.isAlpha(name)){
        errorMssg = "String should contain only a-z A-Z";
        errors.push(errorMssg);
      }

      if(!desc){
        errorMssg = "Desc Is Not Valid";
        errors.push(errorMssg);
      }

      if(desc.length < 10){
        errorMssg = `Desc Should Have min 10 character you have given ${desc.length}`;
        errors.push(errorMssg);
      }

      let priceToInsert = Number(price);
      if(Number.isNaN(priceToInsert) || price <= 0){ 
        errorMssg = `Price Should be greater than 0`;
        errors.push(errorMssg);
      }

      if(!validator.isURL(imageUrl)){
        errorMssg = `Not A Valid Url`;
        errors.push(errorMssg);
      }

      //do the operation
      //addd the data
      //" vikas  "

      if(errors.length > 0){
        return res.render('product-create',{name:name,desc:desc,price:price,imageUrl:imageUrl,errorMssg:errors[0]});
      }

      let obj = {
        name :name.trim(),
        desc:desc.trim(),
        price:priceToInsert,
        imageUrl:imageUrl.trim()
      }

     let resp = ProductModel.addProduct(obj);
     if(!resp){
        errorMssg = `Some error occur please try after sometime`;
        return res.render('error',{errorMssg:errorMssg});
     }
     return res.redirect('/');     
    }
    getProductWithId(req,res){
        //get the data
        // ?name=abc&cd=10
        const {id} = req.query;
        let errorMssg =null;
        let idAsNum = Number(id);
        if(Number.isNaN(idAsNum)){
            errorMssg = "Not A Valid Number";
        }
        let product = ProductModel.getPrdouctFromId(idAsNum);
        if(!product){
            errorMssg = 'Id Not Found';
        }
       
        return res.render('product-create',{product_id:product.id,name:product.name,desc:product.desc,price:product.price,imageUrl:product.imageUrl,errorMssg:errorMssg,isEdit:true});
       
    }
    editProductSave(req,res){
    
        //get the data
      const {id,name,desc,price,imageUrl} = req.body;

        //validate the data
      let errorMssg = null;
      let errors = [];
      //3@1
    //   if(!name || name.length < 4 || !validator.isAlpha(name)){
    //     errorMssg = "Name Should Be  A Valid Alphanumeric Of Min 3 Character";
    //   }

    if(ProductModel.isValidId(id)){
        errorMssg = "Id Is Not Valid";
        errors.push(errorMssg);
    }
      if(!name){
        errorMssg = "Name Is Not Valid";
        errors.push(errorMssg);
       // return res.render('product-create',{errorMssg:errorMssg});
      }

      if(name.length < 4){
        errorMssg = `Name Should Have min 3 character you have given ${name.length}`;
        errors.push(errorMssg);
      }

      if(!validator.isAlpha(name)){
        errorMssg = "String should contain only a-z A-Z";
        errors.push(errorMssg);
      }

      if(!desc){
        errorMssg = "Desc Is Not Valid";
        errors.push(errorMssg);
      }

      if(desc.length < 10){
        errorMssg = `Desc Should Have min 10 character you have given ${desc.length}`;
        errors.push(errorMssg);
      }

      let priceToInsert = Number(price);
      if(Number.isNaN(priceToInsert) || price <= 0){ 
        errorMssg = `Price Should be greater than 0`;
        errors.push(errorMssg);
      }

      if(!validator.isURL(imageUrl)){
        errorMssg = `Not A Valid Url`;
        errors.push(errorMssg);
      }

      //do the operation
      //addd the data
      //" vikas  "

      if(errors.length > 0){
        return res.render('product-create',{product_id:id,name:name,desc:desc,price:price,imageUrl:imageUrl,errorMssg:errors[0],isEdit:true});
      }

      let obj = {
        name :name.trim(),
        desc:desc.trim(),
        price:priceToInsert,
        imageUrl:imageUrl.trim()
      }

     let product =ProductModel.getPrdouctFromId(id);
      product.setName(obj.name);
      product.setDesc(obj.desc);
      product.setImageUrl(obj.imageUrl);
      product.setPrice(obj.price);

     return res.redirect('/');
    }
}
