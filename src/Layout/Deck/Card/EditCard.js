import React from "react";
import {useParams, Link} from "react-router-dom";
import CardForm from "./CardForm";

export default function EditCard({
    deck,
    setDeck,
    decks,
    setDecks,
    deckUrl
}){
    {/* Breadcrumb to be inserted into return */}
    const {cardId} = useParams();
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to='/' className="oi oi-home">Home</Link></li>
                    <li class="breadcrumb-item"><Link to={deckUrl}>{deck.name}</Link></li>
                    <li class="breadcrumb-item active" aria-current="edit-card">Edit Card {cardId}</li>
                </ol>
            </nav>
            <h2>Edit Card</h2>
            <CardForm 
                deck={deck}
                setDeck={setDeck}
                decks={decks}
                setDecks={setDecks}
                deckUrl={deckUrl} />
        </div>
    )
}