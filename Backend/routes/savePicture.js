const path = require('node:path')
const Picture = require('../models/picture')
const Picture_has_category = require('../models/picture_has_category')
const Category = require('../models/category')
const fs = require('node:fs')

// ce endpoint attend 4 parametre : user_id, picture_id, status et categories
module.exports = (app) => {
    app.post('/api/savePicture', async (req, res) => {
        // recuération de l'image + id user
        const picture = req.body.picture
        const userId = req.body.user 
        const status = req.body.status
        const categories = req.body.categories
        // creation du dossier utilisateur si il n'existe pas deja
        const folderName = `userImg/${userId}`
        try{
            if(!fs.existsSync(folderName)){ 
                fs.mkdirSync(folderName) // creation dossier
            }
            // creation image
            const img64 = picture.replace(/^data:image\/jpeg;base64,/, "")
            const imageFile = Buffer.from(img64, 'base64')
            // assignation nom unique a fichier image
            const timeStamp = Date.now()
            const imageName = `${timeStamp}${userId}.jpg`
            const filePath = path.join(folderName, imageName)
            //  enregistrement fichier
            fs.writeFileSync(filePath, imageFile)
            res.status(200).json({msg: "image enregistrée avec succès"})
            // insertion de l'image dans la db 
            const pic = await Picture.create({
                fk_user: userId,
                url_picture: `${folderName}/${imageName}`,
                status: status
            }) 
            //console.log(pic)
            if(categories.length > 0){
                const catProm = categories.map(async (cat)=>{
                    // recuperation de l'id de la categorie
                    const idCat = await Category.findOne({
                        attributes: ['id_category'],
                        where: {name_category: cat}
                    })                 
                    // insertion des categories dans la db
                    return({
                        fk_picture: pic.id_picture,            
                        fk_category: idCat.dataValues.id_category
                    })
                })             
                // attend la resolution des await de chaque boucle
                const pictureCategoryData = await Promise.all(catProm); 
                //insertion de touts les champs en une fois
                Picture_has_category.bulkCreate(pictureCategoryData)                
            }       
        }catch(error){
            console.log(error)
        }
    })
}