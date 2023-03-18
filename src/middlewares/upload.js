const multer = require('multer');
const path = require('path');

const storageProductImages = multer.diskStorage({
    destination : function(req,file,callback){
        callback(null,'public/images/products')
    },
    filename : function(req,file,callback){
        callback(null,`${"img-" + Date.now()}${path.extname(file.originalname)}`)
    }
});

const uploadproductImages = multer({
    storage : storageProductImages,
    fileFilter: (req, file, cb) => {
        if(!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)){
            req.fileValidationError = "Solo se permite imágenes";
            return cb(null,false,req.fileValidationError);
        }
    
        cb(null, true)
      }
});

module.exports = {
    uploadproductImages
}