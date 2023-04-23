import { useEffect, useState } from "react";

import styles from "./PaginatedStyle.module.css";
import Card from "../Card/Card";

export default function Paginated(props){
    const {dogArray} = props

    const [currentPage, setCurrentPage] = useState(1);

    const dogsPerPage = 8;
    const startIndex = (currentPage - 1) * dogsPerPage;
    const endIndex = startIndex + dogsPerPage;

    const dogsToShow = dogArray.slice(startIndex, endIndex);
    const totalPages = Math.ceil(dogArray.length / dogsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [dogArray])

    function handlePageChange(numberPage){
        setCurrentPage(numberPage)
    }

    function getPageNumbers (){
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
        return pageNumbers;
      };


    return(
        <div>
            <div className= {styles.cardsContainer}>           
            {dogsToShow.length ? dogsToShow.map((dog, index) => (
                    <Card 
                    key = {index}
                    id = {dog.id}
                    name = {dog.name}
                    weight = {dog.weight}
                    temperament = {dog.temperament} 
                    image = {dog.image}
                    />
                ))
                :
                (<span className = {styles.spanError}>No dogs were found through these filters. Try changing them!</span>)
            }
            </div>

            <div className = {styles.btnContainer}>
                <button className = {styles.btnNextPrevious} onClick = {() => setCurrentPage(currentPage - 1)} disabled = {currentPage === 1}>&larr; Previous</button>
                {
                    getPageNumbers().map((pageNumber, index) => {
                        return <button className = {styles.btnNumber} key={index} onClick={() => handlePageChange(pageNumber)} disabled={currentPage === pageNumber}>{pageNumber}</button>
                    })
                }
                <button className = {styles.btnNextPrevious} onClick = {() => setCurrentPage(currentPage + 1)} disabled = {endIndex >= dogArray.length}>Next &rarr;</button>
            </div>
        </div>
    )
}