import express from 'express';
import path from 'path';
import ProductController from './src/controllers/productController.js';

const PORT = 8000;


const server = express();

server.use(express.static('public'));

server.set('view engine','ejs');
server.set('views',path.join(path.resolve(),'src','views'));

const productController = new ProductController();
console.log(path.join(path.resolve(),'src','views','products.html'))
server.get('/',productController.getAllProducts)

server.listen(PORT,(err)=>{
    if(err){
        console.log('error',err);
        return;
    }
    console.log(`Server started at port 8000`);
})