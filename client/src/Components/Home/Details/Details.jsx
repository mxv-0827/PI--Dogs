import styles from "./DetailsStyle.module.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getDogDetails } from "../../../Redux/Actions";



export default function Details(){

    const {id} = useParams();

    const {dogDetail} = useSelector((state) => state);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getDogDetails(id))
    }, [dispatch])

    return(
        <div className = {styles.detailsContainer}>
            <h2 className = {styles.dogName}>{dogDetail.name}</h2>

            <br />

            <div className = {styles.infoContainer}>
            {dogDetail.image && dogDetail.image.startsWith("https") ? 
                    <div className = {styles.imgContainer}> <img src= {dogDetail.image}/> </div> 
                : 
                    ("")
                }
                
                <div className = {styles.textContainer}>
                    <h2>Height: <br/> <span>{dogDetail.height?.min ? dogDetail.height?.min : "?"} - {dogDetail.height?.max ? dogDetail.height?.max : "?"} Cms</span></h2>
                    <h2>Weight: <br/> <span>{dogDetail.weight?.min ? dogDetail.weight?.min : "?"} - {dogDetail.weight?.max ? dogDetail.weight?.max : "?"} Kgs</span></h2>
                    <h2>LifeSpan: <br/> <span>{dogDetail.lifeSpan}</span></h2>

                    {dogDetail.bredFor ? (<h2>BredFor: <br/> <span>{dogDetail.bredFor}</span></h2>) : ("") }
                    {dogDetail.breedGroup ? (<h2>BreedGroup: <br/> <span>{dogDetail.breedGroup}</span></h2>) : ("")}
                    {dogDetail.origin ? (<h2>Origin: <br/> <span>{dogDetail.origin}</span></h2>) : ("")}
                    {dogDetail.temperament ? (<h2>Temperaments: <br/> <span>{dogDetail.temperament}</span></h2>) : (<h2>Temperaments: <br /> <span>Unknown</span></h2>)}
                </div> 
            </div>
                
        </div>
    )
}




