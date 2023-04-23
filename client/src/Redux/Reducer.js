import { GET_DOGS, 
    GET_DOG_BY_ID, 
    GET_DOG_BY_NAME, 
    GET_TEMPERAMENTS, 
    GET_MANAGE_DOGS,
    ADD_DOG,
    } from "./Actions";


import orderFunctions from "./Functions/OrderFunctions";
import filterFunctions from "./Functions/FilterFunction";

const initialState = {
    allDogs : [],
    customDogs : [],

    temperaments : [],

    dogDetail : {}
}


export default function reducer(state = initialState, {type, payload}){

    switch(type){
        case GET_DOGS : 
            return {
                ...state,
                allDogs : payload,
                customDogs : payload,
            }
        

        case GET_DOG_BY_ID : 
            
            const payloadAllDogs = state.allDogs.find((dog) => dog.ref_image === payload.ref_image);
            payload = {...payload, image : payloadAllDogs ? payloadAllDogs.image : null}

            return {
                ...state,
                dogDetail : payload
            }


        case GET_DOG_BY_NAME : 

            payload = payload.map((obj2) => {
                const obj1 = state.allDogs.find((obj1) => obj1.ref_image === obj2.ref_image);
                return { ...obj2, image: obj1 ? obj1.image : ""};
            });

            return {
                ...state,
                customDogs : payload
            }

        case GET_TEMPERAMENTS :
            return {
                ...state,
                temperaments : payload
            }
            

        case GET_MANAGE_DOGS : 

            const copy = [...state.allDogs];
            let filteredArray = [];


            filteredArray = copy.filter((dog) => dog.temperament?.includes(payload.temp));

            if(!filteredArray.length){
                filteredArray = filterFunctions(payload.origin, copy)
            }

            else{
                filteredArray = filterFunctions(payload.origin, filteredArray)
            }

            filteredArray = orderFunctions(payload.order, filteredArray);

            return {
                ...state,
                customDogs : filteredArray
            }


        case ADD_DOG :

            return{
                ...state,
                allDogs : [...state.allDogs, payload]
            }


        default :
            return {
                ...state
            }
    }
}
