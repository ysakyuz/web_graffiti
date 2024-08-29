const Picture = require('../models/picture')
const Category = require('../models/category')
const Picture_has_category = require('../models/picture_has_category')

module.exports = (app) => {
    app.get('/api/getAllPicturesOfUser', async function (req, res){
        const fs = require('fs')
        const userId = req.query.userId
        try{
            let allPicturesToClient = []
            const userFolder = `userImg/${userId}` 
            if(fs.existsSync(userFolder)){ 
                // si le dossier de l'user existe
                const allPictures = fs.readdirSync(userFolder)// parcours de tt les files du folder
                // recuperation de chaque images
                for(const file of allPictures){ 
                    const path = `${userFolder}/${file}`
                    const pictureData = fs.readFileSync(path)
                    const categoryData = await getCategory(path)
                    const idPicture = await getIdPicture(path)
                    allPicturesToClient.push(
                        {
                            idPicture: idPicture,
                            picture: pictureData,
                            category: categoryData
                        }
                    )
                }
                const message = `les imagess de l'utilisateurs sont uploadées avec succès`
                res.json({msg: message, data: allPicturesToClient})
            }else{ 
                // dossier de l'user n'existe pas
                const message = "le user n'a créé aucune image"
                return res.json({message})
            }
        }catch(error){
            const message = `error : ${error}`
            return res.json({message: message})
        }
    })
}

async function getIdPicture(url){
    const idPicture = await Picture.findOne({where: {url_picture: url}, attributes: ['id_picture']})
    return idPicture.dataValues.id_picture
}
async function getCategory(path){
    const allCategories =[]
    try{
        const checkId = await Picture.findOne({where: {url_picture: path}})
        const idPic = checkId.dataValues.id_picture
        const cat = await Category.findAll({
            attributes: ['name_category'],
            include: [
                {
                    model: Picture,
                    through: {
                        model: Picture_has_category,
                        where: { fk_picture: idPic}
                    },
                    required: true,
                    logging: false
                }         
            ]
        })
        cat.forEach((category)=>{
            allCategories.push(category.dataValues.name_category)
        })
        return allCategories
    }catch(error){
        console.log(error)
    }
}