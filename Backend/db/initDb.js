const { sequelize } = require('./sequelize')
const User = require('../models/user')
const Picture = require('../models/picture')
const Category = require('../models/category')

//------------------------------------------------
// definition des associations entre les modèles
//------------------------------------------------

// association 1:n entre User & Picture
User.hasMany(Picture, {foreignKey: 'fk_user', as: 'pictures'})
Picture.belongsTo(User, {foreignKey: 'fk_user', as: 'user'})

// association n:n entre Picture & Category via Picture_has_category
Picture.belongsToMany(Category, {
    through: 'Picture_has_category',
    foreignKey: 'fk_picture',
    other: 'id_category'
})
Category.belongsToMany(Picture, {
    through: 'Picture_has_category',
    foreignKey: 'fk_category',
    other: 'id_picture'
})


// ----------------------------------------------------------------------
// Test de syncronisation avec la db => affiche message d erreur si echec
// ----------------------------------------------------------------------
async function init(){
    try{
        await sequelize.authenticate()
        console.log('connexion to db successfull')
    }catch(error){
        console.log(`unable to connect to the db, error : ${error}`)
    }
}
module.exports = init