import styles from "./NavStyle.module.css";

import SearchBar from "../Home/SearchBar/SearchBar";
import images from "../../Utils";

import { useLocation, Link } from "react-router-dom";


export default function Nav(){

    const location = useLocation();

    return(
        <div className = {styles.header}>

            <Link to = "/">
                <img className = {styles.logoContainer} src = {images.imgHuella} alter = "Logo Pagina"/>
            </Link>

            {location.pathname === "/home" || location.pathname === "/dogs" ? <SearchBar/> : (<span></span>)}
            
            <ul className = {styles.navList}>
                

                <Link to = "/home"> 
                    <li>Home</li>
                </Link>

                <Link to = "/about">
                    <li>About Us</li>
                </Link>

                <Link to = "/form">
                    <li>Manage Dogs</li>
                </Link>
            </ul>
        </div>
    )
}