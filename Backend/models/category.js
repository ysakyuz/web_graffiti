const { DataTypes } = require('sequelize')
const { sequelize } = require('../db/sequelize')

const Category = sequelize.define('categories', {
    id_category: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:false,
        allowNull:false
    },
    name_category: {
       type: DataTypes.STRING,
       allowNull: false 
    }
}, {
    createdAt: false,
    updatedAt:false,
    freezeTableName: true
})

module.exports = Category