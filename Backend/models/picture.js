const { DataTypes } = require('sequelize')
const { sequelize } = require ('../db/sequelize')

const Picture = sequelize.define('pictures', {
    id_picture: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    fk_user: {
        type: DataTypes.INTEGER,
        allowNull: false 
    },
    url_picture: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: true,
    updatedAt:false,
    freezeTableName: true
})

module.exports = Picture