import { getDogByName } from "../../../Redux/Actions";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Paginated from "../Paginated/Paginated";


export default function Search(){

    const { customDogs } = useSelector((state) => state);
    const dispatch = useDispatch()

    const [ searchParams ] = useSearchParams();
    const name = searchParams.get("name");

    useEffect(() => {
        dispatch(getDogByName(name))
    },[name, dispatch])

    return(
        <>
            <Paginated dogArray = {customDogs}/>
        </>
    )
}