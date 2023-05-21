const db = require("../database/models");


module.exports={
    loginGoogle: async(req,res) =>{
        const {
         provider,
         emails:[{value:email}],  
         photos:[{value:picture}],
        _json:{
            sub:googleId,
            given_name:firstName,
            family_name:LastName,
        }
        } = req.session.passport.user;
        try{

    const address = await db.Address.create()    
    const[{id,rolId}, isCreate] = await db.User.findOrCreate({
            where: {
                socialId: googleId
            },
            defaults:{
                firstName:firstName,
                LastName: LastName,
                email,
                image: picture,
                rolId: 2,
                addressId:address.id,
                socialId:googleId,
                socialprovider: provider
            }
        })

        if(!isCreate){
            await address.destroy()
        }

        req.session.userLogin = {
            id,
            firstName,
            image: picture,
            rol: rolId,
            socialId: googleId
        };

        res.cookie('usernextgames', req.session.userLogin, { maxAge: 1000 * 60 * 10 })

        res.redirect('/')

        } catch (error) {
        console.log(error);
        }
    },
    loginFacebook : async (req,res) => {
        const {
           provider,
           photos:[{value: picture}],
           _json:{
           id:facebookId,
           name:firstName,
           email
          }
          } = req.session.passport.user;
      
          try {
            const address = await db.Address.create();
            const [{ id, rolId }, isCreate] = await db.User.findOrCreate({
              where: {
                socialId: facebookId,
              },
              defaults: {
                firstName: firstName,
                email,
                image:'userdefault.png',
                rolId: 2,
                addressId:address.id,
                socialId:facebookId,
                socialprovider: provider
              },
            });
      
            if (!isCreate) {
              await address.destroy();
            }
      
            req.session.userLogin = {
              id,
              firstName,
              rol: rolId
            };
      
            res.cookie('usernextgames', req.session.userLogin, { maxAge: 1000 * 60 * 10 })

        res.redirect('/')
          } catch (error) {
            console.log(error);
          } 
    }
}