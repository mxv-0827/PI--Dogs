import styles from "../Landing/Landing.module.css";

import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getTemperaments } from "../../Redux/Actions";

import Socials from "./Redes/Redes";
import Slider from "./Slide-Image/Slide";



export default function Landing(){

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    return (
        <>
            <div className = "landing">
                <div className = {styles.landingContainer}>

                <div className = {styles.content}>
                    <div>
                        <h1>Doggy World 🐶</h1>
                        <p>Welcome to Doggy World, a place where you can take a look to plenty of beatiful types of dogs and at the same time
                            learn a bit more about them, like there lifespan, height, weight and much more. Why don't you give us a try?
                        </p>

                        <br />

                        <Link to = "/home">
                            <button>Go to HomePage</button>
                        </Link>
                        <br />
                        <br />
                        <br />
                        <span>If you like the page, you are also welcome to follow us on our social networks:</span>
                    </div>

                    <Socials/>
                </div>


            <div className = {styles.sliderContainer}>
                <Slider/>
            </div>

            

            </div>
                </div>
                
        </>
    )
}