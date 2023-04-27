const { getUserById, getAllUsers } = require('../../services/usuariosServices')

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
    }
}
