const { DataTypes, UUIDV4 } = require('sequelize');

const Dog = (database) => {
  database.define("Dog", {
    id : {
      type : DataTypes.UUID,
      defaultValue : UUIDV4,
      primaryKey : true
    },
    
    name : {
      type : DataTypes.STRING,
      unique : true,
      allowNull : false
    },

    height : {
      type : DataTypes.STRING, 
      allowNull : false
    },

    weight : {
      type : DataTypes.STRING, 
      allowNull : false
    },

    lifeSpan : {
      type : DataTypes.STRING,
      allowNull : false 
    },

    image : {
      type : DataTypes.TEXT,
      allowNull : false
    },
  },
  {
    timestamps : false
  })
}

module.exports = Dog
