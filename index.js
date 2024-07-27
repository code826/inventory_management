import express from 'express';
import path from 'path';
import expressEjsLayouts from 'express-ejs-layouts';
import ProductController from './src/controllers/productController.js';

const PORT = 8000;


const server = express();

server.use(express.urlencoded({extended:true}));// post req or get request post www-form-urlencoded
server.use(express.json());//when content type application/json

server.use(express.static('public'));

server.set('view engine','ejs');
server.set('views',path.join(path.resolve(),'src','views'));
server.use(expressEjsLayouts);
server.set('layout', 'layout');

const productController = new ProductController();


server.post('/test',(req,res)=>{
    console.log(req.body);
    return res.send('ok');
});


server.get('/',productController.getAllProducts);
server.get('/add-product',productController.addNewProducts);
server.post('/add-product-save',productController.addNewProductSave);
server.post('/edit-product-save',productController.editProductSave);
server.get('/product',productController.getProductWithId);

server.listen(PORT,(err)=>{
    if(err){
        console.log('error',err);
        return;
    }
    console.log(`Server started at port 8000`);
})