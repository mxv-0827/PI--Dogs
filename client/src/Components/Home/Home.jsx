import Cards from "./Cards/Cards";
import Filters from "./Filters/Filters";

import styles from "./HomeStyle.module.css";

export default function Home(){

    const origin = "Cards"
    return (
        <>
        <section className = {styles.topContainer}>
            <Filters origin = {origin}/>
        </section>
            
            <Cards/>
        </>
        
    )
}