//meant to be for displaying deck on the ViewDeck screen
import React from "react";
import {Link, useHistory} from "react-router-dom";
import {deleteDeck} from "../../utils/api/index";

export default function DisplayDeck({deck, decks, setDecks, url}) {
    const history = useHistory();
    function handleClick(event) {
        const abortController = new AbortController();
        event.preventDefault();
        if (window.confirm("You sure you want to delete Deck?")) {
        deleteDeck(deck.id, abortController.signal)
            .then((response) => {
            const filteredDecks = decks.filter((theDeck) => theDeck.id !== deck.id);
            setDecks(() => filteredDecks);
            history.push(`/`);
            })
            .catch(console.error);
        }

    return () => abortController.abort();
  }
  return (
    <div className="card  border-0">
      <div className="card-body px-0">
        <div className="d-flex  justify-content-between ">
          <h5 className="card-title">{deck.name}</h5>
        </div>
        <p>{deck.description}</p>

        <Link to={`${url}/edit`} className="btn btn-secondary mr-1 oi oi-pencil">
          Edit
        </Link>

        <Link to={`${url}/study`} className="btn btn-primary ml-1 oi oi-book">
          Study
        </Link>

        <Link to={`${url}/cards/new`} className="btn btn-primary ml-2 oi oi-plus">
          Add Cards
        </Link>

        <button className="btn btn-danger float-right oi oi-trash" onClick={handleClick}></button>

      </div>
    </div>
  );
}