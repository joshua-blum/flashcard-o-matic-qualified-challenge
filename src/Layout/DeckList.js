import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import {listDecks} from './../utils/api/index';
import FormatDeck from './Deck/FormatDeck';

export default function DeckList({decks, setDecks}){
  const [error, setError] = useState(undefined);

    //make sure that the decks are up to date
    useEffect(() => {
      const abortController = new AbortController();
      listDecks(abortController.signal).then(setDecks).catch(setError);
      return () => abortController.abort(); 
    }, [setDecks])

    if(error) {throw error};

  let deckList = decks.map((deck) => <FormatDeck deck={deck} decks={decks} setDecks={setDecks} />);

    return (
        <div className="home">
            <Link to="/decks/new" className="btn btn-secondary oi oi-plus">
                Create Deck
            </Link>
            <div>
            {deckList}
            </div>
        </div>
    )
}
