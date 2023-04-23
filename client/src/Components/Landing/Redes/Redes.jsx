import styles from "./RedesStyles.module.css";

import images from "../../../Utils"

import { useLocation, Link} from "react-router-dom";

export default function Redes(){
    
    const location = useLocation();

    return (
        <div className = {styles.logoContainer}>
            

            {
                location.pathname === "/" ? 

                <>
                    <Link to = "https://www.instagram.com/the_blue_cross/" target = "_blank">
                        <img src={images.imgInstagram} alt="Logo Instagram"/>
                    </Link>
            
                    <Link to = "https://www.facebook.com/thebluecrossUK" target = "_blank">
                        <img src={images.imgFacebook} alt="Logo Facebook"/>
                    </Link>

                    <Link to = "https://twitter.com/The_Blue_Cross" target = "_blank">
                        <img src={images.imgTwitter} alt="Logo Twitter"/>
                    </Link>
                </>
                
                : (
                    <>
                        <Link to = "https://www.instagram.com/maxi_viand" target = "_blank">
                            <img src={images.imgInstagram} alt="Logo Instagram"/>
                        </Link>
            
                        <Link to = "https://www.facebook.com/maximiliano.viand" target = "_blank">
                            <img src={images.imgFacebook} alt="Logo Facebook"/>
                        </Link>

                        <Link to = "https://es.wikipedia.org/wiki/Twitter" target = "_blank">
                            <img src={images.imgTwitter} alt="Logo Twitter"/>
                        </Link>

                        <Link to = "https://github.com/mxv-0827" target = "_blank">
                            <img src={images.imgGitHub} alt="Logo Twitter"/>
                        </Link>
                    </>
                )
            }
        </div>
    )
}