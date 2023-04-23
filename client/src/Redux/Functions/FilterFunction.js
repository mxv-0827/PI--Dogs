
export default function Filter(payload, array){

    const regex = /([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/;
    let filteredArray = [];

    if(payload === "API"){
        filteredArray = array.filter((dog) => typeof dog.id === "number")
    }

    else if(payload === "DataBase"){
        filteredArray = array.filter((dog) => regex.test(dog.id))
    }

    else{
        filteredArray = array;
    }
    
    return filteredArray
}
    