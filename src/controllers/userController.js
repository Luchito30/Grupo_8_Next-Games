const fs = require('fs');
const path = require('path');

const {validationResult} = require('express-validator');
const { readJSON, writeJSON} = require("../data");
const {hashSync} = require('bcryptjs')


module.exports = {

    register: (req, res) => {
        return res.render('users/register', {
			title: "Next Games | Registro"

        });

    },

	processRegister : (req,res) => {

        const errors = validationResult(req);

        if(errors.isEmpty()){
		
            const users = readJSON("user.json")
            const {firstName, lastName, email, password, userName, image } = req.body
    
            const newUser = {
                id: users.length ? users[users.length -1].id +1 : 1,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hashSync(password,12),
                userName: userName,
                image: req.file ? req.file.filename : "default-image.png",
            };
    
            users.push(newUser);
    
            writeJSON("user.json",users);
    
            return res.redirect('/users/login');
        }else{
            return res.render('users/register',{
            title:"Next Games | Register",
            errors : errors.mapped(),
            old:req.body
        });
    }
        },
        
    
    login: (req, res) => {
        return res.render('users/login', {
        
            title:"Next Games | Login"
        });
    },

	processLogin : (req,res) => {
        const errors = validationResult(req);

       if(errors.isEmpty()){
           
             const {id, firtsName,userName, email, rol} = readJSON('user.json').find(user => user.email === req.body.email);

            req.session.userLogin = {
                id,
                firtsName,
                userName,
                email,
                rol
                
            };

            if(req.body.remember){
                res.cookie('usernextgames',req.session.userLogin,{maxAge: 1000*60} )
           }

            return res.redirect('/')
        }else{
           
           return res.render('users/login',{
            title : "Inicio de sesión",
            errors : errors.mapped()
        })
    }
        
    },
    profile : (req,res) => {
        const users=readJSON('user.json');
        const {id}= req.session.userLogin;
        const user= users.find((user)=> user.id === +id)

        return res.render('users/profile',{
            title : "Next Games | Perfil de usuario",
            ...user,
            old:req.body
        })
    },
    update : (req,res) => {
        return res.send(req.body)
    },
    logout : (req,res) => {
        req.session.destroy();
        res.clearCookie("usernextgames")
        return res.redirect('/')
    },
    list : (req,res) => {
        return res.render('users/users',{
            users : readJSON('user.json')
        })
    }
}

