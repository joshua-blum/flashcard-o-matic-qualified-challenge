import React, {useState} from "react";
import {Route, Switch} from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from './DeckList';
import ViewDeck from './Deck/ViewDeck';
import AddDeck from './Deck/AddDeck';


function Layout() {
  const [decks, setDecks] = useState([]);

  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          
          <Route exact path='/'>
            <DeckList decks={decks} setDecks={setDecks}/>
          </Route>
          
          <Route path='/decks/new'>
            <AddDeck decks={decks} setDecks={setDecks}/>
          </Route>

          <Route path='/decks/:deckId'>
            <ViewDeck decks={decks} setDecks={setDecks}/>
          </Route>

          <Route path="*">
            <NotFound />
          </Route>

        </Switch>
      </div>
    </div>
  );
}

export default Layout;
