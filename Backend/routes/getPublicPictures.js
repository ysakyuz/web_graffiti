const Picture = require('../models/picture')
const Category = require('../models/category')
const Picture_has_category = require('../models/picture_has_category')
const fs = require('fs')
module.exports = (app) => {
    app.get('/api/getPublicPictures', async function (req, res){
        try{
            let allPicturesToClient = []
            // récpuère les url des images qui ont un statut "public"
            const Pictures = await Picture.findAll({ 
                where: {status: 'public'},
                attributes: ['id_picture', 'url_picture', 'fk_user'] 
            })
            // va chercher toutes les fichiers images
            const getCat = Pictures.map( async (pic) =>{
                const imgPath = pic.dataValues.url_picture
                const getPic = fs.readFileSync(imgPath)
                const getCat = await getCategory(imgPath)       
                return ({
                    idPicture: pic.dataValues.id_picture,
                    picture: getPic,
                    category: getCat
                })
            })
            const awaitGetPic = await Promise.all(getCat)
            allPicturesToClient.push(awaitGetPic)
            const message = "toutes les images publics ont bien été récupérées"
            res.json({msg: message, data: allPicturesToClient})
        }catch(error){
            res.json({erreur: error})
        }
    })
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