import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const GET_DOG_BY_ID = "GET_DOG_BY_ID";
export const GET_DOG_BY_NAME = "GET_DOG_BY_NAME";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const GET_MANAGE_DOGS = "GET_MANAAGE_DOGS";
export const ADD_DOG = "ADD_DOG";

export const ERROR = "ERROR";


export function getDogs(){
    return async function(dispatch){
        const dogs = await axios("http://localhost:3001/dogs")

        return dispatch({
            type : GET_DOGS,
            payload: dogs.data
        })
    }
}

export function getDogDetails(id){
    return async function(dispatch){
        const details = await axios(`http://localhost:3001/dogs/${id}`);

        return dispatch({
            type : GET_DOG_BY_ID,
            payload : details.data
        })
    }
}

export function getDogByName(name){
    
    return async function(dispatch){
        const dogName = await axios(`http://localhost:3001/dogs?name=${name}`)

        return dispatch({
            type : GET_DOG_BY_NAME,
            payload : dogName.data
        })
    }
}

export function getTemperaments(){

    return async function(dispatch){

        const temperaments = await axios("http://localhost:3001/temperaments");

        return dispatch({
            type : GET_TEMPERAMENTS,
            payload : temperaments.data
        })
    }
}

export function getManageDogs(temp, origin, order){

    return {
        type : GET_MANAGE_DOGS,
        payload : {
            temp, 
            origin,
            order
        }
    }
}

export function createDog(dog){
    return async function(dispatch){
        dog.height = `${dog.minHeight}-${dog.maxHeight}`;
        dog.weight = `${dog.minWeight}-${dog.maxWeight}`;

        try{
            const newDog = await axios.post("http://localhost:3001/dogs", dog)
            
            return dispatch({
                type : ADD_DOG,
                payload : newDog.data
            })  
        }

        catch{
            const errorMsj = "The Dog's name already exists. Try changing it."

            return Promise.reject(errorMsj)
        }
         
    }
}
