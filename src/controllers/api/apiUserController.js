const { getUserById, getAllUsers, getRegister,getRegisterAdmin,getUpdate,getUpdateUser,getDelete,getDeleteUser,verifyUserByEmail,verifyUserByuserName } = require('../../services/usuariosServices')
const {validationResult} = require('express-validator');
const createResponseError = require('../../helpers/createResponseError');


module.exports = {
    listUser: async (req, res) => {
        try {
            const { count, users } = await getAllUsers(req);
            return res.status(200).json({
                ok: true,
                count,
                users
            })
        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                error: {
                    status: error.status || 500,
                    message: error.message || "Upss, hubo un error"
                }
            })
        }
    },
    detail: async (req, res) => {
        try {
            const user = await getUserById(req, req.params.id);

            if (!user) {
                throw {
                    status: 404,
                    message: "Usuario no encontrado"
                }
            }
            return res.status(200).json({
                ok: true,
                user
            })

        } catch (error) {
            console.log(error)
            return res.status(error.status || 500).json({
                ok: false,
                error: {
                    status: error.status || 500,
                    message: error.message || "Upss, hubo un error"
                }
            })
        }
    },
    registerUser: async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) throw {
                status: 400,
                message: errors.mapped()
            }
            const newUser = await getRegister(req.body);

            return res.status(200).json({
                ok: true,
                message: "Usuario registrado exitosamente",
                data: newUser,
                meta:{
                    status: 200,
                    total:1,
                    url:`/api/users/${newUser.id}`
                }
            });
        } catch (error) {
            return createResponseError(res, error)
        }
    },
    registerUserAdmin: async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) throw {
                status: 400,
                message: errors.mapped()
            }
            const newUser = await getRegisterAdmin(req.body);

            return res.status(200).json({
                ok: true,
                message: "Usuario registrado exitosamente",
                data: newUser,
                meta:{
                    status: 200,
                    total:1,
                    url:`/api/users/${newUser.id}`
                }
            });
        } catch (error) {
            return createResponseError(res, error)
        }
    },
    editUser: async (req,res) => {
        try{
          const user = await getUpdate(req.params.id)
          return res.status(200).json({
            ok:true,
            data: user,
            meta:{
              status:200,
              total:1
            }
          })
        } catch (error) {
          return createResponseError(res,error)
        }
      },
      updateUser : async (req,res) => {
        try{
          const errors = validationResult(req);
          const {id} = req.params
          console.log(id)
    
          if(!errors.isEmpty()) throw{
            status:400,
            message: errors.mapped()
          }
      
        const userUpdate = await getUpdateUser(req.body,id)
    
        return res.status(200).json({
          ok:true,
          meta:{
            status: 200,
            total: 1,
            url: `/api/products/${id}`
          },
          data:{
            userUpdate : userUpdate
          }
          })
        } catch (error) { 
        return createResponseError(res,error)
        } 
      },
      deleteUser: async (req,res) => {
        try{
          const user = await getDelete (req.params.id)
          return res.status(200).json({
            ok:true,
            data: user,
            meta:{
              status:200,
              total:1
            }
          })
        } catch (error) {
          return createResponseError(res,error)
        }
      },
      deleteAllUser : async (req, res) => {
        try {
          const errors = validationResult(req);
          const { id } = req.params;
          console.log(id);
      
          if (!errors.isEmpty()) {
            throw {
              status: 400,
              message: errors.mapped(),
            };
          }
      
          const userDelete = await getDeleteUser(id);
      
          return res.status(200).json({
            ok: true,
            meta: {
              status: 200,
              total: 1,
              url: `/api/products/${id}`,
            },
            data: {
                userDelete: userDelete,
            },
          });
        } catch (error) {
          return createResponseError(res, error);
        }
      },
      verifyEmail: async (req, res) => {
        try {

            const existUser = await verifyUserByEmail(req.body.email);

            return res.status(200).json({
                ok: true,
                data: {
                    existUser
                }
            })

        } catch (error) {
            console.log(error)
            return createResponseError(res, error)
        }
    },
    verifyuserName: async (req, res) => {
      try {

          const existUser = await verifyUserByuserName(req.body.userName);

          return res.status(200).json({
              ok: true,
              data: {
                  existUser
              }
          })

      } catch (error) {
          console.log(error)
          return createResponseError(res, error)
      }
  }
}

