const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize(
    'mygraffie_projet',
    'mygraffie_projet',
    '****************', {
        host: 'web24.swisscenter.com',
        dialect: 'mariadb',
        dialectOptions: {
            timeZone: 'Etc/GMT-2'
        },
        logging: false
    }
)
module.exports = { sequelize }