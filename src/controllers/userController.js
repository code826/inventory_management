import validator from "validator";
import UserModel from "../models/userModel.js";

export default class UserController{
    getRegister(req,res){
        res.render('register');
    }
    postRegister(req,res){
        //get the data
        const {name,email,password} = req.body;
        //name
        //email
        //password
        console.log('password',password);
       let user = UserModel.getUserFromEmail(email);
       if(user){
        return res.render('error',{errorMssg:'user exist'});
       } 

       UserModel.createUser({name,email,password});

       return res.redirect('/');
    }
    loginUser(req,res){
        res.render('login');
    }

    postlogin(req,res){
        const {email,password} = req.body;

        if(!email || !validator.isEmail(email)){
            return res.render('error',{errorMssg:'Email Not Valid'});
        }

        console.log('user',email);
        //
        let user = UserModel.getUserFromEmail(email);
        if(!user){
            return res.render('error',{errorMssg:'Email Not Valid'});
        }
        console.log('user',user);

        if(user.password !== password){
            return res.render('error',{errorMssg:'Email Not Valid'}); 
        }
       // res.cookie('email',user.email);
        req.session.email = user.email;
        return res.redirect('/');
    }
    logout(req,res){
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }else{
                res.redirect('/');
            }
        })
    }
}