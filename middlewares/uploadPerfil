const multer = require('multer');
const path = require('path');

const storagePerfil = multer.diskStorage({
    destination : function (req,file,callback) {
        callback(null,'public/images/users')
        
    },
    filename : function (req,file,callback
        ){
            callback(null,`${Date.now()}_users_${path.extname(file.originalname)}`)
    }
});

const uploadPerfil = multer({
    storage : storagePerfil
});

module.exports = {
    uploadPerfil
}