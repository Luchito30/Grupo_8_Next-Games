const db = require('../database/models')
const { literalQueryUrlImage, literalQueryUrl } = require('../helpers')

module.exports = {

    getAllUsers: async (req) => {
        try {
            const { count, rows: users } = await db.User.findAndCountAll(
                {
                    attributes: {
                        exclude: ['password'],
                        include: [
                            literalQueryUrlImage(req, 'users', 'firstName', 'image', 'urlImage')
                        ]
                    },
                    attributes: {
                        include: [
                            literalQueryUrl(req, 'users', 'rolId')
                        ]
                    }
                }
            )
            return {
                count,
                users
            }
        } catch (error) {
            console.log(error)
            throw {
                status: 500,
                message: error.message
            }
        }
    },


    getUserById: async (req, id) => {
        try {
            const user = await db.User.findByPk(id, {
                attributes: {
                    exclude: ['password'],
                    include: [
                        literalQueryUrlImage(req, 'users', 'image', 'urlImage')
                    ]
                },
                include: [{
                    association: "rol"
                }]
            })
            return user
        } catch (error) {
            console.log(error)
            throw {
                status: 500,
                message: error.message
            }
        }
    }
}
