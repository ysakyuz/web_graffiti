const User = require('../models/user')
const bcrypt = require('bcrypt')

// ce endpoint attend 5 parametres : user_id, firstname, lastname, email et password
module.exports = (app) => {
    app.post('/api/modifyAcount', async (req, res) => {
        // recupération des data de la requete
        const id = req.body.id
        const firstname = req.body.firstname
        const lastname = req.body.lastname
        const email = req.body.email
        const passwordInput = req.body.password
        let password = passwordInput;
        try{
            // aller chercher l'user correspondant à l'id envoyé
            const user = await User.findOne({where: {id_user: id}})
            const isPasswordChanged = await bcrypt.compare(passwordInput, user.password)
            // le mot de passe a changé
            if(!isPasswordChanged){
                password = await bcrypt.hash(passwordInput, 10)
            }
            // le mot de passe est identique
            // modification des données de l'user
            user.firstname = firstname
            user.lastname = lastname
            user.email = email
            user.password = password
            // sauvegarde des données dans la db
            await user.save()
            const message = "user a bien été modifié"
            return res.json({message: message, user: user})
        }catch(error){
            const message = `error : ${error}`
            return res.json({message: message})
        }
    })
}