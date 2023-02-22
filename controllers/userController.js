const fs = require('fs');
const path = require('path');

const users = path.join(__dirname, '../data/user.json');
const user = JSON.parse(fs.readFileSync(users, 'utf-8'));

module.exports = {

    register: (req, res) => {
        return res.render('users/register', {
            ...user,
			title: "Next Game | Registro"

        });

    },

    create: (req, res) => {
		const {id, firstName, lastName, email, password, category, image } = req.body

		const newUser = {
			id: id,
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: password,
			category: category,
			image: image,
		};

		user.push(newUser);

		fs.writeFileSync(users, JSON.stringify(user, null, 3), 'utf-8');

		return res.redirect('/');
	},
    

    login: (req, res) => {
        return res.render('users/login', {
            ...user,
            title:"Next Game | Login"
        });
    },
}

