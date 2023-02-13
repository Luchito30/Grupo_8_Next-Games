const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/user.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

module.exports  = {
   
    register: (req, res) => {
        return res.render('users/register', {
            ...user,
            
        });
        
    },
    login: (req, res) => {
        return res.render('users/login', {
            ...user,
            
        });
    },
}

