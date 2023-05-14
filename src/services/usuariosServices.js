const db = require('../database/models')
const { literalQueryUrlImage, literalQueryUrl } = require('../helpers')

module.exports = {

    getAllUsers: async (req) => {
        try {
            const { count, rows: users } = await db.User.findAndCountAll(
                {
                    attributes: {
                        exclude: ['password','rolId'],
                        include: [
                            literalQueryUrlImage(req, 'users', 'firstName', 'image', 'urlImage')
                        ]
                    },
                    attributes: {
                        exclude: ['password','rolId'],
                        include: [
                            literalQueryUrl(req, 'users', 'id')
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
                    exclude: ['password','rolId'],
                    include: [
                        literalQueryUrlImage(req, 'users', 'image', 'urlImage')
                    ]
                }
            })
            return user
        } catch (error) {
            console.log(error)
            throw {
                status: 500,
                message: error.message
            }
        }
    },
    getRegister : async (body) => {
        try {
          const {
            firstName,
            lastName,
            email,
            password,
            userName,
            image
          } = body;
      
          const address = await db.Address.create();
          const newUser = await db.User.create({
            firstName,
            lastName,
            email,
            password: hashSync(password, 12),
            userName,
            rolId: 2,
            addressId: address.id,
            image
          });
      
          return newUser;
        } catch (error) {
          throw new Error(error.message);
        }
      },
      getRegisterAdmin : async (body) => {
        try {
          const {
            firstName,
            lastName,
            email,
            password,
            userName,
            image
          } = body;
      
          const address = await db.Address.create();
          const newUser = await db.User.create({
            firstName,
            lastName,
            email,
            password: hashSync(password, 12),
            userName,
            rolId: 1,
            addressId: address.id,
            image
          });
      
          return newUser;
        } catch (error) {
          throw new Error(error.message);
        }
      },
      getUpdate: async (id) => {
        try {
          const User = await db.User.findByPk(id, {
            attributes: {
                exclude: ['password','rolId',"createdAt","updatedAt"],
            },
            include: [
              {
                association: "rol",
                attributes: ["rol"],
              }
            ],
          });
          return User;
        } catch (error) {
          throw {
            status: 500,
            message: error.message,
          };
        }
      },
      getUpdateUser: async(id, body, file) => {
        try{
            const {
                firstName,
                lastName,
                email,
                password,
                userName,
                image
              } = body;

        const edituser = await db.User.update({
            firstName,
            lastName,
            email,
            password: hashSync(password, 12),
            userName,
            image: file ? file.filename : "userdefault.png"
        },
        {
            where:{
                id:id
            }
        })
        return edituser 
        } catch (error) {
            throw{
                status:500,
                message: error.message
            }
        }
      },
      getDelete: async (id) => {
        try {
          const user = await db.User.findByPk(id, {
            attributes: ["username"],
          });
          if (!user) {
            throw {
              status: 404,
              message: "Usuario no encontrado",
            };
          }
          return user;
        } catch (error) {
          throw {
            status: 500,
            message: error.message,
          };
        }
      },
      getDeleteUser: async (id) => {
        try {
          const deleteduser = await db.User.destroy({
            where: {
              id: id,
            },
          });
      
          if (deleteduser === 0) {
            throw {
              status: 404,
              message: "Usuario no encontrado",
            };
          }
      
          return {
            success: true,
            message: "Usuario eliminado correctamente",
          };
        } catch (error) {
          throw {
            status: 500,
            message: error.message,
          };
        }
      },
      
}
