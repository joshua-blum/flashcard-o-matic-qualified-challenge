import React from "react";
import {Link} from "react-router-dom";
import CardForm from "./CardForm";

export default function AddCard({
    deck,
    setDeck,
    decks,
    setDecks,
    deckUrl
}){
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to='/' className="oi oi-home">Home</Link></li>
                    <li className="breadcrumb-item"><Link to={deckUrl}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="add-card">Add Card</li>
                </ol>
            </nav>
            <h2>{deck.name}: Add Card</h2>
            <CardForm 
                deck={deck}
                setDeck={setDeck}
                decks={decks}
                setDecks={setDecks}
                deckUrl={deckUrl} />
        </div>
    )
}