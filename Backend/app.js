const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const port = 3000
const initDb = require('./db/initDb')

// middlewares
app.use(cors())
app.use(bodyParser.json({limit: '50mb'}))

// endpoints
require('./routes/createUser')(app)
require('./routes/login')(app)
require('./routes/savePicture')(app)
require('./routes/getAllPictureOfUser')(app)
require('./routes/getPublicPictures')(app)
require('./routes/modifyAcount')(app)
require('./routes/deleteAcount')(app)
require('./routes/deletePicture')(app)

// erreur 404 si aucunes route n'est trouvée
app.use(({res}) => {
    const message = 'erreur 404 ! '
    res.status(404).json({message})
})

//syncronisation de la db + création des associations entre modeles
initDb()
// démarrage du server avec message de confirmation
app.listen(port, ()=>console.log(`server demmarré sur le port ${port}`))