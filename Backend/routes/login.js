const User = require('../models/user')
const bcrypt = require('bcrypt')


// ce endpoint attend 2 parametres : pseudo & password
module.exports = (app) => {
    app.post('/api/loginUser', async (req, res) => {
        const Email = req.body.email
        const Password = req.body.password
        try{
            // requete qui va chercher l'utilisateur (son pseudo)
            const user = await User.findOne({where: {email: Email}})
            if(user === null){ // si il ne trouve rien 
                const message = "user n'existe pas"
                return res.json({msg: message, auth: false}) 
            }
            // si il trouve le user, compare les passwords 
            const isPasswordValid = await bcrypt.compare(Password, user.password)
            // si passwords ne correspondent pas
            if(!isPasswordValid){
                const message = "password incorrect"
                return res.json({msg: message, auth: false})
            }
            // si passwords correspondent => user connecté !
            const message = "user identifié avec succès"
            return res.status(200).json({msg: message, auth: true, user: user})
        }catch(error){
            return res.json({msg: "erreur lors du login : ", error: error})
        }
    })
}