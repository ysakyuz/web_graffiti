const User = require('../models/user')
const bcrypt = require('bcrypt')

// ce endpoint attend 4 parametres : firstname, lastname, email & password
module.exports = (app) => {
    app.post('/api/createUser', function (req, res){
        const Firstname = req.body.firstname
        const Lastname = req.body.lastname
        const Email = req.body.email
        const Password = req.body.password
        if(Email && Password){
            // hashage du mot de passe
            bcrypt.hash(Password, 10) 
            .then(async (hash) => {
                let userData = undefined;
                try{
                    // insertion dans la db
                    userData = await User.create({ 
                        email: Email,
                        password: hash,
                        firstname: Firstname,
                        lastname: Lastname
                    })
                }catch(error){
                    // si email deja utilisée
                    return res.json({insert: false}) 
                } 
                const message = "user créé avec succès"
                res.json({msg: message, user: userData, auth: true})                            
            })             
        }
    })
}




