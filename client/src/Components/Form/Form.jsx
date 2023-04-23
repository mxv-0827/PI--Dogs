import styles from "./FormStyle.module.css";

import images from "../../Utils";

import { createDog } from "../../Redux/Actions";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function Form(){

    const dispatch = useDispatch();
    const { temperaments } = useSelector((state) => state);


    const [buttonnState, setButtonState] = useState(false);
    const [error, setError] = useState("");
    const [compMounted, setCompMounted] = useState(false);
    const [modalPage, setModalPage] = useState(false);


    const formObj = {
        name : "",
        minHeight : "",
        maxHeight : "",
        minWeight : "",
        maxWeight : "",
        lifeSpan : "",
        temperament : [],
        image : ""
    }

    const [form, setForm] = useState(formObj);

    let validateTempArray = temperaments.filter((temp) => !form.temperament.some((Temp) => temp === Temp.name))

    
    useEffect(() => {
        let valueError = false;

        if(form.name.length < 3 && compMounted){
            setError("The Dog's name must include at least 3 digiters");
            valueError = true;
        }

        if(parseInt(form.minHeight) > parseInt(form.maxHeight)){
            setError("The minHeight value cannot be higher than the maxHeight value")
            valueError = true;
        }
    
        if(parseInt(form.minWeight) > parseInt(form.maxWeight)){
            setError("The minWeight value cannot be higher than the maxWeight value")
            valueError = true;
        }
    
        setButtonState(Object.values(form).every((prop) => {
            if (Array.isArray(prop)) {
              return prop.length > 0;
            } else {
              return prop !== "" && error === "";
            }
          }));

        if(error && !valueError){
            setTimeout(() => {
                setError("")
            }, 2000)
        }
    }, [form, error])


    useEffect(() => {
        setCompMounted(true)
    }, [compMounted])


    useEffect(() => {
        setTimeout(() => {
            setModalPage(false)
        },5000)
    }, [modalPage])



    function onlyLettersValidation(event){
        if (/\d/.test(event.key)) {
            event.preventDefault();
            setError(`On the ${event.target.name} input, only letters are allowed.`);
        }
    }

    function onlyNumbersValidation(event){
        if (!/\d/.test(event.key)) {
            event.preventDefault();
            setError(`On the ${event.target.name} input, only numbers are allowed.`);
        }
    }


    function handleForm(event){
        event.preventDefault();
        
        setForm({
            ...form,
            [event.target.name] : event.target.value
        })
    }

    function handleTemperament(event){
        event.preventDefault();
        setForm({
            ...form,
            temperament : [...form.temperament, {name : event.target.value}]
            }
        )
    }

    function handleSubmit(event){
        event.preventDefault();

        dispatch(createDog(form))
        .then(() => {
            setForm(formObj)
            setCompMounted(false)
            setModalPage(true)
        })
        .catch((error) => {
            setError(error)
        })
    }


    return (
        <div className = {styles.mainContainer}>
            <form className = {styles.formContainer} onSubmit = {handleSubmit}>

                <input type = "text" placeholder = "Introduce the dog's name: " name = "name" value = {form.name} onKeyPress = {onlyLettersValidation} onChange = {handleForm}/>

                <div>
                    <input type = "text" placeholder = "Introduce min. height: " name = "minHeight" value = {form.minHeight} onKeyPress = {onlyNumbersValidation} onChange = {handleForm}/>
                    <span> - </span>
                    <input type = "text" placeholder = "Introduce max. height: " name = "maxHeight" value = {form.maxHeight} onKeyPress = {onlyNumbersValidation} onChange = {handleForm}></input>
                </div>

                <div>
                    <input type = "text" placeholder = "Introduce min. weight: " name = "minWeight" value = {form.minWeight} onKeyPress = {onlyNumbersValidation} onChange = {handleForm}/>
                    <span> - </span>
                    <input type = "text" placeholder = "Introduce max. weight: " name = "maxWeight" value = {form.maxWeight} onKeyPress = {onlyNumbersValidation} onChange = {handleForm}></input>
                </div>

                <input type="text" placeholder = "Introduce Dog's lifespan: " name = "lifeSpan" value = {form.lifeSpan} onKeyPress = {onlyNumbersValidation} onChange = {handleForm}/>

                <select placeholder = "Introduce a temperament: " onChange = {handleTemperament}>
                    {validateTempArray.map((temp, index) => (<option key = {index} value = {temp}>{temp}</option>))}
                </select>
            
                {
                    form.temperament.length ? (<span className = {styles.spanTemp} value = {form.temperament}><strong>Temperament/s: {form.temperament?.map((temp) => `${temp.name}`).join(" - ")}</strong></span>) : ""
                }

                <input type = "text" placeholder = "Introduce an image (only JPG): " name = "image" value = {form.image} onChange = {handleForm} />
                
                {
                    error ? <span className = {styles.spanError}><strong>Error: {error}</strong></span> : ""
                }

                <button type = "submit" disabled = {!buttonnState}>Upload Dog</button>
            </form>

            {
                modalPage && (
                    <div className = {styles.modalPageContainer}>
                        <div className = {styles.animatedShadow}>
                            <div className = {styles.modalPage}>
                                <img src = {images.imgCorrecto} alt = "Icono de exito"/>
                                <span>The dog was successfully posted!!</span>
                            </div>
                        </div>
                    </div>
                )
            }
        </div> 
    )
}