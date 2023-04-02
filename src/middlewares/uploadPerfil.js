const multer = require('multer');
const path = require('path');

const storagePerfil = multer.diskStorage({
    destination : function (req,file,callback) {
        callback(null,'public/images/users')
        
    },
    filename : function (req,file,callback){
            callback(null,`${Date.now()}_users_${path.extname(file.originalname)}`)
    }
});

const uploadperdilImages = multer({
    storage : storagePerfil,
    fileFilter: (req, file, cb) => {
        if(!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)){
            req.fileValidationError = "Solo se permite imágenes";
            return cb(null,false,req.fileValidationError);
        }
    
        cb(null, true)
      }
});

module.exports = {
    uploadperdilImages
}