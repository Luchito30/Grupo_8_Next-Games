const {Op} = require("sequelize")
const db = require('../database/models')
module.exports = mtd ={
    getOrder:async ({userId}) =>{
      if(!userId){
            throw{
                ok:false,
                message:"Debes ingresar el userId"
            }}
         const [order] = await   db.Order.findOrCreate({
            where:{
           [Op.and]:[
            {
                userId,
        },
        {
            status:'pending',
        }
        ]
            },
            defaults:{
                 userId,
            },
            include: [
                {
                association: 'cart',
                through: {
                    attributes: ["quantity"],
                  },
                include: ["images"]
            }]
        }); 
        return order




    },

    createProductCart: async({userId, productId}) =>{
        if(!userId || !productId){
            throw{
                ok:false,
                message:"Debes ingresar el userId y productId"
            }}
            const order = await mtd.getOrder({userId});
            await mtd.getCart({orderId:order.id,productId})
            const orderReload = await order.reload({include:{all:true}})
            order.total = mtd.calcTotal(orderReload)
            await order.save();
        },
        
        
         removeCart:({orderId, productId}) =>{
            db.Cart.destroy({
                where:{
                    [Op.and]:[
                        {
                            orderId,
                        },
                        {productId
                        },
                    ],
                },
            });
         },
         removeProductFromCart: async({userId,productId})=>{
            if(!userId || !productId){
                throw{
                    ok:false,
                    message:"Debes ingresar el userId y productId",
                };
            }
            const order = await mtd.getOrder({userId});
            return mtd.removeCart({orderId: order.id, productId})
         },
         moreOrLessQuantityFromProduct: async({userId, productId,action="more"}) =>{
            if(!userId || !productId){
                throw{
                    ok:false,
                    message:"Debes ingresar el userId y productId",
                };
            }
            const order = await mtd.getOrder({userId});
            
            const [cart,isCreated] = await mtd.getCart({
                
                orderId:order.id,
                productId,
            });


            if(!isCreated){
                if(action === "more"){
                    cart.quantity++

                } else{
                    cart.quantity--
                }

        
            await cart.save();
        }
             const orderReload = await order.reload({include:{all:true}})
            order.total = mtd.calcTotal(orderReload);
            
             await order.save();
            
             return order
            //mtd.calcTotal(order)
           },
           clearAllProductFromCart:async({userId}) =>{
            if(!userId){
                throw{
                    ok:false,
                    message:"Debes ingresar el userId",
                };
            }
            const order = await mtd.getOrder({userId})
           return  db.Cart.destroy({
                where:{orderId:order.id}
            })




           },
           modifyStatusFromOrder:async({userId,status})=>{
          if(!userId || !status){
           throw{
          ok:false,
             message:"Debes ingresar el userId y el status"
                                                  }
}
          const order = await mtd.getOrder({userId});
          order.status = status
          await order.save();
           },
          getCart:({orderId,productId}) =>{
                return db.Cart.findOrCreate({where:{
                    [Op.and]:[
                        {
                            orderId,
                        },
                        {
                            productId,
                        },
                    ],
                },
                defaults:{
                    orderId,
                    productId,
                }
            });
           },
           calcTotal:({cart})=>{
            return cart.reduce((acum,{price,Cart,discount})=>{
                const priceCalc = discount ? price - (price * discount /100):price
                acum += priceCalc * Cart.quantity
                return acum; },0)
           }

}