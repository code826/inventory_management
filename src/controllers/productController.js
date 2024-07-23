import path from 'path';
import ProductModel from '../models/productModel.js';
import { title } from 'process';
// export function getAllProducts(req,res){
//     return res.sendFile(path.join(path.resolve(),'src','views','products.html'));
// }

export default class ProductsController{
    getAllProducts(req,res){
        return res.sendFile(path.join(path.resolve(),'src','views','products.html'));
    }
}
