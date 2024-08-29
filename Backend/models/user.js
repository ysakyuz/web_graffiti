const { DataTypes } = require('sequelize')
const { sequelize } = require ('../db/sequelize')

const User = sequelize.define('users', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email : {
       type: DataTypes.STRING,
       allowNull: false 
    }, 
    password: {
        type: DataTypes.STRING,
        allowNull: false 
    }, 
    firstname: {
        type: DataTypes.STRING,
        allowNull: false 
    }, 
    lastname: {
        type: DataTypes.STRING,
        allowNull: false 
    }
}, {
    createdAt: true,
    updatedAt:false,
    freezeTableName: true
})

module.exports = User