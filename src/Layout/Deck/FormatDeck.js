import React from "react";
import {Link, useHistory} from "react-router-dom";
import { deleteDeck } from "../../utils/api";

export default function FormatDeck({deck, decks, setDecks}) {
    const history = useHistory();

    let numberOfCards = 0;
    if(deck.cards) numberOfCards = deck.cards.length;

    // delete handler for the delete button for the deck
    /* must receive user input from modal
    * then setDecks to what decks were minus the deckToDelete
    * then take us to home screen */
    const handleDelete =  (event) => {
        const abortController = new AbortController();
        event.preventDefault();
        if (window.confirm("You sure you want to delete Deck?")) {
        deleteDeck(deck.id, abortController.signal)
            .then((response) => {
            const tempDecks = decks.filter((theDeck) => theDeck.id !== deck.id);
            setDecks(() => tempDecks);
            history.push(`/`);
            })
            .catch(console.log("Bad magnitude 10"));
        }

        return () => abortController.abort();
    }
    

    return (
        <div className="card mb-3 ">
            <div className="card-body">
                <div className="d-flex  justify-content-between ">
                    <h5 className="card-title">{deck.name}</h5>
                        <small> {numberOfCards} {numberOfCards === 1 ? "card": "cards"}</small>
                </div>

                <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-1 oi oi-eye">
                    View
                </Link>

                <Link to={`/decks/${deck.id}/study`} className="btn btn-primary ml-1 oi oi-book">
                    Study
                </Link>

                <button className="btn btn-danger float-right oi oi-trash" onClick={handleDelete} >
                    Delete
                </button>

            </div>
        </div>
        );
}