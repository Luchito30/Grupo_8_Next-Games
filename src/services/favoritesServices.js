const { Op } = require("sequelize");
const db = require("../database/models");

module.exports = {
    getUserWithFavorites : ({userId}) => {
    if(!userId){
        throw{
            status :400,
            message: 'Es necesario enviar el userId'
        };
    }
    const config = {
        include : [
            {
                association: "productsFavorites"
            }
        ]
    };
    return db.User.findByPk(userId, config);
    },
    addOrRemoveToFavorite: async ({userId,productId}) => {
        if(!userId || !productId){
            throw{
                status :400,
                message: 'Es necesario enviar el userId y productId'
            };
        }
        const config ={
            where: {
                [Op.and] : [
                    {
                        userId,
                    },
                    {
                        productId,
                    }
                ]
            },
            default: { userId, productId},
        }
        const [Favorites, isCreated] = await db.Favorites.findOrCreate(config);

        if(!isCreated) {
           await Favorites.destroy()
        }
        return !isCreated;
    },
};