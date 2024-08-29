const User = require('../models/user')

// ce endpoint attend 1 parametre : user_id
module.exports = (app) => {
    app.post('/api/deleteAcount', async function (req, res){
        const userID = req.query.id
        try{
            // recuperer user
            const user = await User.findOne({where: {id_user: userID}})
            console.log("user : ", user)
            // detruire le record
            user.destroy()
            return res.json({msg: 'user supprimé avec succès'})
        } catch(error){
            return res.json({msg: `error : ${error}`})
        }
    })
}