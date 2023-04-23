const {Temperament} = require("../DataBase");


const cleanArrayTemps = (array) => {

    array = array.flat().map(temp => temp.trim());

    array = array.filter((temp, index) => {
        return array.indexOf(temp) === index;
    });

    return array;
}



const getTempsToDB = async (array) => {

    await array.forEach(temp =>  {
        return Temperament.findOrCreate({where : {name : temp}})
    });
}



module.exports = {
    cleanArrayTemps,
    getTempsToDB
}