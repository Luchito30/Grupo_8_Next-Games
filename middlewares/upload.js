const multer = require('multer');
const path = require('path');
const storageProductImages = multer.diskStorage({
    destination : function(req,file,callback){
        callback(null,'public/images')
    },
    filename : function(req,file,callback){
        callback(null,`${Date.now()}_images_${path.extname(file.originalname)}`)
    }
}); const uploadProductImages = multer({
    storage : storageProductImages
});
module.exports ={
    uploadProductImages
}