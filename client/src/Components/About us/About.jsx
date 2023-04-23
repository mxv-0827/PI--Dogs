import styles from "./About.module.css";
import images from "../../Utils";

import Redes from "../Landing/Redes/Redes";

export default function About(){
    return(
        <div className = {styles.aboutContainer}>
            <div className = {styles.infoContainer}>
            <ul>
                <li>
                    <strong>About the designer:</strong>
                    <ul>
                        <li><strong>Name:</strong> Maximiliano Ezequiel Viand</li>
                        <li><strong>Date of Birth:</strong> 27/08/2002</li>
                        <li><strong>Nationality:</strong> Buenos Aires, Argentina</li>
                    </ul>
                </li>

                <br />

                <li>
                    <strong>About the page:</strong>
                    <ul>
                        <li><strong>Name of the project:</strong> Doggy World</li>
                        <li>
                            <strong>Description:</strong>
                            <p>The page retrieves data from this URL <strong>https://api.thedogapi/v1/breeds</strong>. The page allows its users to filter dogs by
                                temperaments (their personality traits) and origin (whether they are brought from the API or our DataBase). Users 
                                can also order the different cards both by their name and weight.
                                <br />
                                <br />
                                On the "Manage Dogs" section, you can post your own dogs by sharing some information about them. Users can also upload
                                a photo of it by introducing a valid link. All posted dogs are stored in our DataBase, which can be consulted to 
                                see all dogs from it.
                                <br />
                                <br />
                                Finally, you can also search a dog by its name. Don't worry, our searchBar is case-insensitive so you don't have to
                                remember the exact name of the dog you are looking for. 
                            </p>
                        </li>
                    </ul>
                </li>
            </ul>
            </div>
            
            <div className = {styles.imgContainer}>
                <img src= {images.imgPers} alt="Persona Posando" />
            </div>

            <div className = {styles.redesContainer}>
                <span>My social networks:</span>
                <Redes/>
            </div>
            
        </div>
    )
}



