//meant to be used to study a card in StudyDeck
import React, {useState} from "react";
import NextButton from "./NextButton";

export default function StudyCard({cards}) {
    const [cardNumber, setCardNumber] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const areCards = cards.length !== 0;

    let displayedContent = "";
    const handleClick = () => {
        setIsFlipped(!isFlipped);
        setIsVisible(!isVisible);
    }

    if(isFlipped && areCards) displayedContent = cards[cardNumber].back;
    else if(areCards) displayedContent = cards[cardNumber].front;

    if(areCards){
        return (
            <div className="card mb-3">
                <div className="card-body">
                    <div className="d-flex  justify-content-between ">
                        <h5 className="card-title">{`Card ${cardNumber + 1} of ${cards.length}`}</h5>
                    </div>
                    <p>{displayedContent}</p>
                    <button className="btn btn-secondary ml-1 oi oi-arrow-thick-top" onClick={handleClick}>
                        Flip
                    </button>
                    {isVisible ? (
                        <NextButton
                            setIsFlipped={setIsFlipped}
                            length={cards.length}
                            cardNumber={cardNumber}
                            setCardNumber={setCardNumber}
                            setIsVisible={setIsVisible}
                        />
                    ) : null}
                </div>
            </div>
        )


    } else return null;
    
}