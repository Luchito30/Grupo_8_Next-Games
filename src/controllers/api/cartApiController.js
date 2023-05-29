const sendErrorResponse = require("../../helpers/sendErrorResponse");
const sendSuccesResponse = require("../../helpers/sendSuccesResponse");
const { getOrder, createProductCart,moreOrLessQuantityFromProduct,clearAllProductFromCart, modifyStatusFromOrder } = require("../../services/cartService");
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
     const {id} = req.session.userLogin;
    await createProductCart({userId:id ,productId});
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
        const {id} = req.session.userLogin;
       await moreOrLessQuantityFromProduct({userId: id, productId});
        sendSuccesResponse(res);
        
     } catch (error) {
        sendErrorResponse(res,error)
     }
},
lessQuantity: async(req,res)=>{
    try {
        const {productId} = req.body;
        const {id} = req.session.userLogin;
        await moreOrLessQuantityFromProduct({userId: id, productId,action:"less"});
        sendSuccesResponse(res);
        
     } catch (error) {
        sendErrorResponse(res,error)
     }
},

clearCart:async(req,res)=>{
    try {
        const {id} = req.session.userLogin;
       await  clearAllProductFromCart({userId:id}) 
       sendSuccesResponse(res);  
     } catch (error) {
        sendErrorResponse(res,error);
    }
},
statusOrder: async(req,res)=>{
try {
    const{status} = req.body;
    const {id} = req.session.userLogin;
    await modifyStatusFromOrder({userId:id,status});
    sendSuccesResponse(res);
    
} catch (error) {
    sendErrorResponse(res,error)
}

}   
}