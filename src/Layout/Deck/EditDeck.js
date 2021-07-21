import React, {useEffect, useState} from "react";
import {Link, useHistory, useParams, useRouteMatch} from "react-router-dom";
import {updateDeck, listDecks} from '../../utils/api/index';
import DeckForm from './DeckForm';
 
export default function EditDeck({deck, setDeck, setDecks, deckUrl}) {
    const history = useHistory();
    const {deckId} = useParams();
    const {path} = useRouteMatch();
    

    const [formData, setFormData] = useState({
        name: deck.name,
        description: deck.description,
        id: deckId, 
    })

    //links the temp deck to the formdata
    const [temporaryDeck, setTemporaryDeck] = useState({
        name: formData.name,
        description: formData.description,
        id: formData.id,
    });

    //changes the form data as the form input fields are used
    const handleChange = ({target}) => setFormData({...formData, [target.name] : target.value});

    //will update the fomr data whenever there is a change to the deck in question
    useEffect(() => {
        setFormData({
            name: deck.name,
            description: deck.description,
            id: deckId, 
        })
    }, [deck]);

    //will update the temp deck whenever the formData changes
    useEffect(() => {
        setTemporaryDeck({
            name: formData.name,
            description: formData.description,
            id: formData.id,
        })
    }, [formData]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new window.AbortController();
        try{
            const response = await updateDeck(temporaryDeck, abortController.signal);
            setDeck({...deck, ...temporaryDeck});
            let updatedDecks = await listDecks(abortController.signal);
            setDecks({...updatedDecks});
            history.push(deckUrl);
        } catch (error) {
            if(error === "AbortError") console.log("aborted handleSubmit");
            else throw error;
        }
        return () => abortController.abort();
    }

    return (
    <div>
        <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to='/' className="oi oi-home">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="edit-deck">Edit Deck</li>
                </ol>
            </nav>
        <h2>Edit Deck</h2>
        <DeckForm changeHandler={handleChange} submitHandler={handleSubmit} nameOfForm="editDeck" formData={formData} />
    </div>
  );
}