const subcategory = require('../../database/models/subcategory');
const {getAllProducts,  getProductById}=require('../../services/productServices');



module.exports = {
    'index': async (req, res) => {
        try {
            const{count,categoryCount,products, subcategory} = await getAllProducts(req);

            return res.status(200).json({
                ok:true,
                count,
                categoryCount,
                products
               
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok : false,
                error : {
                    status : error.status || 500,
                    message : error.message || "Upss, hubo un error"
                }
            })
         }
    },
    'detail': async(req, res) => {
        try {

            const product = await getProductById(req,req.params.id);

            if(!product){
                throw{
                    status:404,
                    message:'Producto no encontrado'
                }
            }
            return res.status(200).json({
                ok:true,
                product
            })
} catch (error) { 
    console.log(error)
    return res.status(error.status || 500).json({
        ok : false,
        error : {
            status : error.status || 500,
            message : error.message || "Upss, hubo un error"
        }
    })
}


    }
    

};

