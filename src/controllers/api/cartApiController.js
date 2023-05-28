const sendErrorResponse = require("../../helpers/sendErrorResponse");
const sendSuccesResponse = require("../../helpers/sendSuccesResponse");
const { getOrder, createProductCart,moreQuantityFromProduct } = require("../../services/cartService");
module.exports ={

getOrderPending: async(req,res)=>{
try {
    const {id} = req.session.userLogin
   const order = await getOrder({userId:id});
res.status(200).json({ok:true,data:order})
sendSuccesResponse(res,{ data:order})
} catch (error) {
    sendErrorResponse(res,error)
}
},
addProduct : async(req,res)=>{
try {
    const {productId} = req.body;
     //const {id} = req.session.userLogin;
    await createProductCart({userId:3 ,productId});
    sendSuccesResponse(res)
} catch (error) {
    sendErrorResponse(res,error)
}

    
},
removeProduct: async(req,res)=>{
 try {
    const {productId} = req.body;
    const {id} = req.session.userLogin;
    await removeProductFromCart({userId: id , productId});
    sendSuccesResponse(res);
    
 } catch (error) {
    sendErrorResponse(error,res)
 }
},
moreQuantity: async(req,res)=>{
    try {
        const {productId} = req.body;
        //const {id} = req.session.userLogin;
     const cart =   await moreQuantityFromProduct({userId: 3, productId});
        sendSuccesResponse(res);
        
     } catch (error) {
        sendErrorResponse(res,error)
     }
},
lessQuantity:(req,res)=>{},
clearCart:(req,res)=>{},
statusOrder:(req,res)=>{}   
}