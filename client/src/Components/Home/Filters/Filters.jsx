import styles from "./FiltersStyle.module.css";

import {useState, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";

import { getManageDogs } from "../../../Redux/Actions";


export default function Filters(){

    const tempRef = useRef("All");
    const originRef = useRef("Both");
    const orderRef = useRef("A-Z");

    const dispatch = useDispatch();
    const { temperaments, customDogs } = useSelector((state) => state);

    const [validateFilter, setValidateFilter] = useState(true);
    const [selectedFilters, setSelectedFilters] = useState({
        Temperament : "Show All",
        Origin : "Both",
        Order: "A-Z"
    })


    useEffect(() => {
        setValidateFilter(customDogs.length === 0 || customDogs.length === 1 ? false : true);
    }, [dispatch, customDogs])


    function handleFullDogs(event){
        event.preventDefault();

        dispatch(getManageDogs(tempRef.current.value, originRef.current.value, orderRef.current.value))
    }

    return (
        <>
            <div className = {styles.filters}>
                <span><strong>Temperament</strong></span>
                <select className = {styles.filterContainer} ref = {tempRef} onChange = {handleFullDogs}>
                    <option value = "All">Show All</option>
                    {    
                        temperaments.map((temp, index) => (
                            <option key = {index} value = {temp}>{temp}</option>
                        ))
                    }
                </select>
            </div>

            <div className = {styles.filters}>
                <span><strong>Origin</strong></span>
                <select className = {styles.filterContainer} ref = {originRef} onChange = {handleFullDogs}>
                    <option className = {styles.optionContainer} value = "Both">Both</option>
                    <option value = "API">API</option>
                    <option value = "DataBase">DataBase</option>
                </select>
            </div>
            
            <div className = {styles.filters}>
                <span className = {!validateFilter ? styles.orderSpan : ""}><strong>Order</strong></span>
                <select className = {styles.filterContainer} ref = {orderRef} onChange = {handleFullDogs} disabled = {!validateFilter}>
                    <option value = "Alphabeth Ascendant">A-Z</option>
                    <option value = "Alphabeth Descendant">Z-A</option>
                    <option value = "Weight Ascendant">Weight ⏫</option>
                    <option value = "Weight Descendant">Weight ⏬</option>
                </select>
            </div>
            
        </>
    )
}