import styles from "./SearchBarStyle.module.css";

import { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";


export default function SearchBar(){

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [enableBtn, setEnablBtn] = useState(true);


    useEffect(() => {
        if(name.length >= 3){
            setEnablBtn(false)
        }
        else{
            setEnablBtn(true)
        }
    }, [name])



    function obtainName(event){
        setName(event.target.value);
    }

    function onlyLettersValidation(event){
        if (/\d/.test(event.key)) {
            event.preventDefault();
        }
    }

    function handleSubmit(event){
        event.preventDefault();

        navigate(`/dogs?name=${name}`);

        setName("");
    }


    return(
        <form className = {styles.searchContainer} onSubmit = {handleSubmit}>
            <input type="text" placeholder = "Search by name:" value = {name} onKeyPress = {onlyLettersValidation} onChange = {obtainName}/>
            <button type = "submit" disabled = {enableBtn}>Search</button>
        </form>
    )
}