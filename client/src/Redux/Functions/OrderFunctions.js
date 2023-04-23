export default function orderFunctions(payload, array){


    if(payload === "Alphabeth Ascendant" || payload === "Alphabeth Descendant"){
        array = array?.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 'Alphabeth Ascendant' === payload ? 1 : -1;
        }   
    
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return 'Alphabeth Descendant' === payload ? 1 : -1;
        }
    
        return 0;
        })
    }
    
    else{
        array = array?.sort((a, b) => {
        if (a.weight?.min > b.weight?.min) {
            return 'Weight Ascendant' === payload ? 1 : -1;
        }   
    
        if (a.weight?.min < b.weight?.min) {
            return 'Weight Descendant' === payload ? 1 : -1;
        }
        
        if(a.weight?.min === b.weight?.min){
            if (a.weight?.max > b.weight?.max) {
                return 'Weight Ascendant' === payload ? 1 : -1;
            }   
        
            if (a.weight?.max < b.weight?.max) {
                return 'Weight Descendant' === payload ? 1 : -1;
            }

            return 0;
        }
        })
    }

    return array;
}
