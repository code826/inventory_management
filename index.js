import express from 'express';
import path from 'path';
import expressEjsLayouts from 'express-ejs-layouts';
import ProductController from './src/controllers/productController.js';
import uploadFile from './src/middleware/uploadFile.js';
import cookieParser from 'cookie-parser';
import UserController from './src/controllers/userController.js';
import UserModel from './src/models/userModel.js';
const PORT = 8000;


const server = express();

server.use(express.urlencoded({extended:true}));// post req or get request post www-form-urlencoded
server.use(express.json());//when content type application/json
server.use(cookieParser());//cookies in header req.cookies
server.use(express.static('public'));

server.set('view engine','ejs');
server.set('views',path.join(path.resolve(),'src','views'));
server.use(expressEjsLayouts);
server.set('layout', 'layout');

const productController = new ProductController();
const userController = new  UserController();


server.get('/test',(req,res)=>{
    //cookie-parser --> use to parse the cookies
    console.log('cookies',req.cookies);
    res.cookie('name','vikas',{maxAge:1000*60});
    return res.send('okk');
});

server.use('/',(req,res,next)=>{
    // cookies and fin if there is something from email
    if(req.cookies.email){
       let user = UserModel.getUserFromEmail(req.cookies.email);
       console.log('user',user,req.cookies.email);
       req.user = user;
    }else{
        req.user = null;
    }
   
    next();
});


server.get('/',productController.getAllProducts);
server.get('/product',productController.getProductWithId);
server.get('/add-product',productController.addNewProducts);
server.post('/add-product-save', uploadFile.single('imageUrl'),productController.addNewProductSave);
server.post('/edit-product-save',uploadFile.single('imageUrl'),productController.editProductSave);
server.delete('/delete-product/:id',productController.deleteProduct);

server.get('/user/register',userController.getRegister);
server.post('/user/register',userController.postRegister);
server.get('/user/login',userController.loginUser);
server.post('/user/login',userController.postlogin);
//req.file

server.listen(PORT,(err)=>{
    if(err){
        console.log('error',err);
        return;
    }
    console.log(`Server started at port 8000`);
})