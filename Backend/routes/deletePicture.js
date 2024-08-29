const Picture = require('../models/picture')
const Picture_has_category = require('../models/picture_has_category')
const fs = require('node:fs')

// ce endpoint attend 1 parametre : id_picture
module.exports = (app) => {
    app.post('/api/deletePicture', async function (req, res){
        const idPicture = req.query.id
        try{  
          // recupération de l'url de l'image selon son id
            const urlReq = await Picture.findOne({where: {id_picture: idPicture}, attributes: ['url_picture']})          
            const url = urlReq.url_picture
            // suppression des record dans la db
            Picture.destroy({where: {id_picture: idPicture}})
            Picture_has_category.destroy({where: {fk_picture: idPicture}})
            //suppression du fichier sur le server
            fs.unlink(`./${url}`, (err) => {
                if (err) {
                  console.error(err);
                }
            });
        }catch(error){
            console.log(error)
        }     
    })
}