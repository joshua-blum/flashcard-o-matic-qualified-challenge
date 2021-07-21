import React, {useState} from "react";
import {Link} from "react-router-dom";
import StudyCard from './Card/StudyCard';

export default function StudyDeck({deck, deckPath, cards}){

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to='/' className="oi oi-home">Home</Link></li>
                    <li class="breadcrumb-item"><Link to={deckPath}>{deck.name}</Link></li>
                    <li class="breadcrumb-item active" aria-current="study-deck">Study</li>
                </ol>
            </nav>
            <h2>{deck.name}: Study</h2>
            {cards.length < 2 ? (
                <div>
                    <h3>Not Enough Cards.</h3>
                    <p> You need at least 3 cards to study. There are {cards.length} cards in
                    this deck</p>
              </div>
            ):(
                <StudyCard cards={cards} />
            )} 
        </div>
    )
}