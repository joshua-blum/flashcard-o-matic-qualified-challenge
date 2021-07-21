import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import DeckForm from './DeckForm';
import {createDeck} from '../../utils/api/index';

export default function AddDeck({decks, setDecks}) {
    const history = useHistory();
    let initializeForm = {
        name:"",
        description:"",
    }
    
    const [formData, setFormData] = useState({...initializeForm});
    const [newDeck, setNewDeck] = useState({
        name: formData.name,
        description: formData.description,
    });
  const [error, setError] = useState(undefined);


    //whenever there is a change to either name or description fields, formData values are updated
    const handleChange = ({target}) => {
      setFormData({...formData, [target.name]: target.value});
    }
  
    //update the newDeck every time the formData changes
    useEffect(() => {setNewDeck({...formData, name: formData.name, description: formData.description})}, [formData]);

    let newDecks = decks;
    const handleSubmit =  (event) => {
        event.preventDefault();
        const abortController = new AbortController();
      createDeck(newDeck, abortController.signal)
       .then((response) => {
        newDecks.push(response);
        setDecks(() => newDecks);
        setFormData({...initializeForm});
        history.push(`/decks/${response.id}`);
      })
      .catch(console.log(error));
        return () => abortController.abort();
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to='/' className="oi oi-home">Home</Link>
                  </li>
                    <li className="breadcrumb-item active" aria-current="create-deck">Create Deck</li>
                </ul>
            </nav>
            <DeckForm changeHandler={handleChange} submitHandler={handleSubmit} nameOfForm="createDeck" formData={formData} />
        </div>
    )
}
