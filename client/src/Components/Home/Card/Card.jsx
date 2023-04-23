import styles from "./CardStyle.module.css";

import { Link } from "react-router-dom";


export default function Card(props){
    const {id, name, weight, temperament, image} = props;

    return (       
        <div className = {styles.dogContainer}>
            <Link to = {`/detail/${id}`}>
                {
                    image.startsWith("http") ? <img src = {image} alter = "Foto Perro"/> : <span className = {styles.spanError}>No image Available</span>
                }  
            </Link>

            <div className = {styles.dogContent}>
                <h2>Dog's name: <br /><span>{name}</span></h2>
                <h2>Weight: <br /> <span>{weight.min ? weight.min : "?"} - {weight.max ? weight.max : "?"} Kgs</span></h2>
                <h2 className = {styles.tempH2}>Temperaments: <br /> <span>{temperament ? temperament : "???"}</span></h2>
            </div> 
        </div>    
    )
}