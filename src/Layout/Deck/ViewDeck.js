import React, { useEffect, useState } from "react";
import {useParams, Switch, Route, Link, useRouteMatch} from "react-router-dom";
import { readDeck } from "../../utils/api";
import DisplayDeck from './DisplayDeck';
import CardList from './Card/CardList';
import EditCard from './Card/EditCard';
import AddCard from './Card/AddCard';
import EditDeck from './EditDeck';
import StudyDeck from './StudyDeck';



export default function ViewDeck({decks, setDecks}) {
    const {deckId} = useParams();
    const {path, url} = useRouteMatch();
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);

    {/* Breadcrumb to integrate into return */}

    //initialize the deck state using the relevant parameter
    useEffect(() => {
        const abortController = new window.AbortController();
        readDeck(deckId, abortController.signal)
        .then(setDeck)
        .then(() => {
          if(deck.cards) setCards([...deck.cards]);
        })
        .catch((error) => {throw error});
        return () => abortController.abort();
    }, []);

    useEffect(() => {
      if (deck.cards !== undefined) setCards([...deck.cards]);
    }, [deck]);  

    return (
        <div>
      <Switch>
        <Route path={`${path}/cards/:cardId/edit`}>
          <EditCard
            decks={decks}
            deck={deck}
            setDeck={setDeck}
            deckUrl={url}
            setDecks={setDecks}
          />
        </Route>
        <Route path={`${path}/cards/new`}>
          <AddCard
            decks={decks}
            deck={deck}
            setDeck={setDeck}
            deckUrl={url}
            setDecks={setDecks}
            cards={cards}
            setCards={setCards}
          />
        </Route>
        <Route path={`${path}/edit`}>
          <EditDeck
            deck={deck}
            setDeck={setDeck}
            setDecks={setDecks}
            deckUrl={url}
          />
        </Route>
        <Route path={`${path}/study`}>
          <StudyDeck decks={decks} deck={deck} cards={cards} deckPath={path} />
        </Route>
        <Route path={`${path}`}>
          <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                      <li className="breadcrumb-item"><Link to='/' className="oi oi-home">Home</Link></li>
                      <li className="breadcrumb-item active" aria-current="view-deck">{deck.name}</li>
                  </ol>
              </nav>

          <DisplayDeck deck={deck} url={url} decks={decks} setDecks={setDecks} />
          <CardList
            deck={deck}
            setDeck={setDeck}
            cards={cards}
            setCards={setCards}
          />
        </Route>
      </Switch>
    </div>
    )



}