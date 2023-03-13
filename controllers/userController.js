const {validationResult} = require('express-validator');
const fs = require('fs');
const path = require('path');
const {hashSync} = require('bcryptjs')
const users = path.join(__dirname, '../data/user.json');
const user = JSON.parse(fs.readFileSync(users, 'utf-8'));

module.exports = {

    register: (req, res) => {
        return res.render('users/register', {
            ...user,
			title: "Next Game | Registro"

        });

    },

  processRegister: (req, res) => {
	const errors = validationResult(req);

	if(errors.isEmpty()){
		
		const {id, firstName, lastName, email, password, category, image } = req.body

		const newUser = {
			id: user[user.length -1].id +1,
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: hashSync(password,12),
			category: category,
			image: req.files && req.files.image ? req.files.image[0].filename : "default-image.png",
		};

		user.push(newUser);

		fs.writeFileSync(users, JSON.stringify(user, null, 3), 'utf-8');

		return res.redirect('/users/login');
	}else{
		return res.render('users/register',{
			title : "Registro de usuario",
			errors : errors.mapped(),
			old : req.body
		})
	}
	},
    

    login: (req, res) => {
        return res.render('users/login', {
            ...user,
            title:"Next Game | Login"
        });
    },
}

