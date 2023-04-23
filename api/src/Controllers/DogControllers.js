const axios = require("axios");
const {Op} = require("sequelize");

const {Dog, Temperament} = require("../DataBase");


const getDogApi = async (array) => {
    cantPerros = 0;

    let updatedArray = [];

    array.forEach(dog => {

            updatedArray.push(
                {
                    id : dog.id,
                    name : dog.name,
                    weight : {
                        min : parseInt(dog.weight.metric.split("-")[0]),
                        max : parseInt(dog.weight.metric.split("-")[1])
                    },                       
                    temperament : dog.temperament,
                    ref_image : dog.reference_image_id,
                    image : dog.image?.url,                    
                }
            ) 
            cantPerros++;
                 
    });

    return updatedArray;
}

const getDogDB = async () => {
    const dogDB = await Dog.findAll({
        attributes : { exclude : ["lifeSpan", "height"]},
        include : {
            model : Temperament,
            attributes : ["name"],
            through : {
                attributes : []
            }
        }
    })


    const structuredArray = dogDB.map(dog => {
        const { Temperaments, ...modifiedDog } = dog.toJSON();

        return {
            ...modifiedDog,

            weight : {
                min : parseInt(dog.weight.split("-")[0]),
                max : parseInt(dog.weight.split("-")[1])
            },
            temperament: dog.Temperaments.map(temp => temp.name).join(", ")
        };
    })

    return structuredArray;
};


const getDogIdAPI = async (id) => {
    const dog = await axios(`https://api.thedogapi.com/v1/breeds/${id}`);

    const detail = dog.data;

    const dogDetails = {
        id : detail.id,
        name : detail.name,
        height : {
            min : parseInt(detail.height?.metric.split("-")[0]),
            max : parseInt(detail.height?.metric.split("-")[1])
        },
        weight : {
            min : parseInt(detail.weight?.metric.split("-")[0]),
            max : parseInt(detail.weight?.metric.split("-")[1])
        },
        lifeSpan : detail.life_span,
        bredFor : detail.bred_for,
        breedGroup : detail.breed_group,
        origin : detail.origin,
        temperament : detail.temperament,
        ref_image : detail.reference_image_id,
    }

    return dogDetails;
}

const getDogIdDB = async (id) => {
    const dog = await Dog.findByPk(id, 
        {
            include : {
                model : Temperament,
                attributes : ["name"],
                through : {
                    attributes : []
                }
            }
        });


            const { Temperaments, ...modifiedDog } = dog.toJSON();
    
            return {
                ...modifiedDog,
                
                height : {
                    min : parseInt(dog.height.split("-")[0]),
                    max : parseInt(dog.height.split("-")[1])
                },

                weight : {
                    min : parseInt(dog.weight.split("-")[0]),
                    max : parseInt(dog.weight.split("-")[1])
                },
                temperament: dog.Temperaments.map(temp => temp.name).join(", ")
            };

}



const getDogNameAPI = async (name) => {
    const dog = await axios(`https://api.thedogapi.com/v1/breeds/search?q=${name}`);

    const realDog = await getDogApi(dog.data)
    return realDog;
}

const getDogNameDB = async (name) => {

    const dog = await Dog.findAll({
        attributes : {exclude : ["height", "lifeSpan"]},
        where : {name : {[Op.iLike] : `%${name}%`}},

        include : {
            model : Temperament,
            attributes : ["name"],
            through : {attributes : []}
        }
    })

    const structuredArray = dog.map(dog => {
        const { Temperaments, ...modifiedDog } = dog.toJSON();

        return {
            ...modifiedDog,

            weight : {
                min : parseInt(dog.weight.split("-")[0]),
                max : parseInt(dog.weight.split("-")[1])
            },
            temperament: dog.Temperaments.map(temp => temp.name).join(", ")
        };
    })
    
    return structuredArray;
}



const createDog = async (name, height, weight, temperament, lifeSpan, image) => {

    const newDog = await Dog.create({name, height, weight, lifeSpan, image});

    let tempsIdArray = [];

    for(const temp of temperament){
        const temperador = await Temperament.findOne({
            where : {name : temp.name},
            defaults : {id : temp.id}
        })
        tempsIdArray.push(temperador)
    }

    await newDog.addTemperaments(tempsIdArray)
    return newDog;
}


module.exports = {
    getDogApi,
    getDogDB,

    getDogIdAPI,
    getDogIdDB,

    getDogNameAPI,
    getDogNameDB,

    createDog
}