import path from 'path';
import validator from 'validator';

import ProductModel from '../models/productModel.js';

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
      //3@1
    //   if(!name || name.length < 4 || !validator.isAlpha(name)){
    //     errorMssg = "Name Should Be  A Valid Alphanumeric Of Min 3 Character";
    //   }
      if(!name){
        errorMssg = "Name Is Not Valid";
        return res.render('error',{errorMssg:errorMssg});
      }

      if(name.length < 4){
        errorMssg = `Name Should Have min 3 character you have given ${name.length}`;
        return res.render('error',{errorMssg:errorMssg});
      }

      if(!validator.isAlpha(name)){
        errorMssg = "String should contain only a-z A-Z";
        return res.render('error',{errorMssg:errorMssg});
      }

      if(!desc){
        errorMssg = "Desc Is Not Valid";
        return res.render('error',{errorMssg:errorMssg});
      }

      if(desc.length < 10){
        errorMssg = `Desc Should Have min 10 character you have given ${desc.length}`;
        return res.render('error',{errorMssg:errorMssg});
      }

      let priceToInsert = Number(price);
      if(Number.isNaN(priceToInsert) || price <= 0){ 
        errorMssg = `Price Should be greater than 0`;
        return res.render('error',{errorMssg:errorMssg});
      }

      if(!validator.isURL(imageUrl)){
        errorMssg = `Not A Valid Url`;
        return res.render('error',{errorMssg:errorMssg});
      }

      //do the operation
      //addd the data
      //" vikas  "

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
}
