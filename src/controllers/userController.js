const fs = require('fs');
const path = require('path');

const {validationResult} = require('express-validator');
const { readJSON, writeJSON} = require("../data");
const {hashSync} = require('bcryptjs');


module.exports = {

    register: (req, res) => {
        return res.render('users/register', {
			title: "Next Games | Registro"

        });

    },
	processRegister : (req,res) => {

        const errors = validationResult(req);

        if(req.fileValidationError){
            errors.errors.push({
              value : "",
              msg : req.fileValidationError,
              param : "images",
              location : "files"
            })
          }

        if(errors.isEmpty()){
		
            const users = readJSON("user.json")
            const {firstName, lastName, email, password, userName, image } = req.body
    
            const newUser = {
                id: users.length ? users[users.length -1].id +1 : 1,
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                password: hashSync(password,12),
                userName: userName.trim(),
                image: req.file ? req.file.filename : "default-image.png",
                rol : 'user'
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
           
             const {id, firstName, rol,image} = readJSON('user.json').find(user =>user.email === req.body.useremail || user.userName === req.body.useremail);

            req.session.userLogin = {
                id,
                firstName,
                rol,
                image
                };

            if(req.body.remember){
                res.cookie('usernextgames',req.session.userLogin,{maxAge: 1000*60*10} )
           }

            return res.redirect('/')
        }else{
           
           return res.render('users/login',{
            title : "Next Games | Login",
            errors : errors.mapped()
        })
    }
        
    },
    profile : (req,res) => {
        const users = readJSON('user.json');
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
    removeuserConfirm : (req,res) => {
        const users = readJSON('user.json');
        const id = req.params.id;
        const user = users.find(user => user.id === +id);

        return res.render("users/removeuserConfirm", {
            ...user,
            title: "Next Games | Advertencia"
        })
    },
    recuperarContraseña : (req,res)=>{
        return res.render('users/recuperarContraseña', {
            title:"Next Games | Recuperar contraseña"
            });
        },
    removeusers : (req,res) => {
        const users = readJSON('user.json');
        const id = req.params.id;
        const usersModified = users.filter(user => user.id !== +id);

        writeJSON("user.json", usersModified);
        return res.redirect("/admin/dashboardUser")
    },
    registerAdmin: (req, res) => {
        return res.render('users/crearAdmin', {
			title: "Next Games | Crear Administrador"

        });

    },
    ProcessAdmin : (req,res) => {

        const errors = validationResult(req);

        if(req.fileValidationError){
            errors.errors.push({
              value : "",
              msg : req.fileValidationError,
              param : "images",
              location : "files"
            })
          }

        if(errors.isEmpty()){
		
            const users = readJSON("user.json")
            const {firstName, lastName, email, password, userName, image } = req.body
    
            const newUser = {
                id: users.length ? users[users.length -1].id +1 : 1,
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                password: hashSync(password,12),
                userName: userName.trim(),
                image: req.file ? req.file.filename : "default-image.png",
                rol : 'admin'
            };
    
            users.push(newUser);
    
            writeJSON("user.json",users);
    
            return res.redirect('/admin/dashboardUser');
        }else{
            return res.render('users/crearAdmin',{
            title: "Next Games | Crear Administrador",
            errors : errors.mapped(),
            old:req.body
        });
    }
        },


}

