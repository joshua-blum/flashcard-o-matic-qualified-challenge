//component to handle the "Next button" for StudyCard in Study Deck
import React from "react";
import {useHistory} from "react-router-dom";

export default function NextButton({ 
    setIsFlipped,
    length,
    cardNumber,
    setCardNumber,
    setIsVisible}) {
        const history = useHistory();

        const handleClick = (event) => {
            if (cardNumber < length - 1) {
                setCardNumber(cardNumber + 1);
                setIsFlipped(false);
                setIsVisible(false);
            } else if (window.confirm("Restart cards?")) {
                setCardNumber(0);
                setIsVisible(false);
            } else history.push("/");      
        }

        return (
            <button className="btn btn-primary ml-1 oi oi-arrow-thick-right" onClick={handleClick}>
                Next
            </button>
        )
}