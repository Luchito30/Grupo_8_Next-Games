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

const uploadProductImages = multer({
    storage : storageProductImages
});
module.exports ={
    uploadProductImages
}