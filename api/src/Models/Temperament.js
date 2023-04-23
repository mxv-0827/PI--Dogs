const { DataTypes, UUIDV4 } = require('sequelize');

const Temperament = (database) => {
    database.define("Temperament", {
        id : {
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true
        },

        name : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true
        }
    },
    {
        timestamps : false
    })
}

module.exports = Temperament;