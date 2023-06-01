const sendErrorResponse = require("../../helpers/sendErrorResponse")
const sendSuccesResponse = require("../../helpers/sendSuccesResponse")
const { getUserWithFavorites, addOrRemoveToFavorite } = require("../../services/favoritesServices")

module.exports ={
    getFavorites:async (req,res) => {
        try{
            const  {id} = req.session.userLogin;
            const user = await getUserWithFavorites({userId : id})
            sendSuccesResponse(res,{data:user.productsFavorites})
        } catch (error) {
            sendErrorResponse(res,error)
        }
    },
    toggleProductFavorite:async (req,res) => {
        try{
        const {id} = req.session.userLogin;
        const {productId} = req.body
        const isRemove =  await addOrRemoveToFavorite({userId:id, productId})    
        sendSuccesResponse({ data: { isRemove } });
        } catch (error) {
            sendErrorResponse(res,error);
        }

    },
}