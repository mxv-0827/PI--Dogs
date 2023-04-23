import Paginated from "../Paginated/Paginated";

import { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";

import {getDogs} from "../../../Redux/Actions";


export default function Cards(){

    const dispatch = useDispatch();
    const { customDogs } = useSelector((state) => state);

    useEffect(() => {
        dispatch(getDogs())
    }, [])

    return(
        <>
            <Paginated dogArray = {customDogs}/>
        </>
    )
}