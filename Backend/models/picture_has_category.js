const { DataTypes } = require('sequelize')
const { sequelize } = require('../db/sequelize')

const Picture_has_category = sequelize.define('picture_has_category', {
    id_picture_has_category: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    fk_picture: {
       type: DataTypes.INTEGER,
       allowNull: false,
       references: {
            model: 'Picture',
            key: 'id_picture'
       }
    },
    fk_category: {
        type: DataTypes.INTEGER,
        allowNull: false ,
        references: {
            model: 'Category',
            key: 'id_category'
        }
     }
}, {
    createdAt: false,
    updatedAt:false,
    freezeTableName: true
})

module.exports = Picture_has_category