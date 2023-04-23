const axios = require("axios");

const {
    getDogApi,
    getDogDB,

    getDogIdAPI,
    getDogIdDB,

    getDogNameAPI, 
    getDogNameDB, 

    createDog, 
    } = require("../Controllers/DogControllers");


const {
    cleanArrayTemps,
    getTempsToDB
    } = require("../Controllers/TempControllers");



const getAllDogs = async function(request, response){
    
    try {
        const allDogs = await axios("https://api.thedogapi.com/v1/breeds");

        const fullFilledArray = await getDogApi(allDogs.data)
        const fullFilledArray2 = await getDogDB();
        
        response.status(200).json(fullFilledArray.concat(fullFilledArray2));    
    } 
    
    catch (error) {
        response.status(404).json({error : error.message});
    }
}



const getDogById = async function(request, response){
    const {idRaza} = request.params;
    const regex = /([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/;

    try {
        if(regex.test(idRaza)){
            const dogDB = await getDogIdDB(idRaza);
            response.status(200).json(dogDB) 
        }

        else{
            const dogAPI = await getDogIdAPI(idRaza);
            response.status(200).json(dogAPI) 
        }
    } 
    
    catch (error) {
        response.status(404).json({error : error.message});
    }
}



const getDogByName = async function(request, response){
    const {name} = request.query;

    try {
        const dogName = await getDogNameAPI(name);
        const dogName2 = await getDogNameDB(name);

        response.status(200).json(dogName.concat(dogName2));
    } 
    
    catch (error) {
        response.status(404).json({error : error.message});
    }
}



const getAllTemperaments = async function(request, response){

    let tempsArray = [];

    try {
        const temps = await axios("https://api.thedogapi.com/v1/breeds");
        
        temps.data.forEach(temp => {
            if(temp.temperament){
                tempsArray.push(
                    temp.temperament.split(",")
                )
            }
        });

        tempsArray = cleanArrayTemps(tempsArray);

        tempsArray = await tempsArray.sort((a, b) => { if(a < b) return -1 });
        await getTempsToDB(tempsArray);

        response.status(200).json(tempsArray);
    } 
    
    catch (error) {
        response.status(404).json({error : error.message});
    }
}



const addDog = async function(request, response){

    const {name, height, weight, temperament, lifeSpan, image} = request.body;

    try {
        const newDog = await createDog(name, height, weight, temperament, lifeSpan, image);
        response.status(200).json(newDog)
    } 
    
    catch (error) {
        response.status(404).json({error : error.message})
    }
}

module.exports = {
    getAllDogs,
    getDogById,
    getDogByName,
    getAllTemperaments,
    addDog,
}