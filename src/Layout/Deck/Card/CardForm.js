import React, {useState, useEffect} from "react";
import {Link, useHistory, useRouteMatch} from "react-router-dom";
import {updateCard, createCard, readCard} from "../../../utils/api/index";

export default function CardForm({
    deck,
    setDeck,
    decks,
    setDecks,
    deckUrl
}){
    const history = useHistory();
    const {url} = useRouteMatch();
    const [formData, setFormData] = useState(
        {front:"", back:""}
    )
    const [edit, setEdit] = useState(false);

    const tempDeck = deck;
    let tempDecks = decks;

    //tracking whether this form is to be used in EditCard or AddCard
    const urlComponents = url.split('/');
    useEffect(() => {
        if(urlComponents[urlComponents.length - 1] === "edit"){
            setEdit(true);
            const abortController = new AbortController();
            const readingTheCard = async () => {
                try {
                    const response = await readCard(urlComponents[urlComponents.length - 2], abortController.signal);
                    setFormData(response);
                } catch(error) {throw error}
            }
            readingTheCard();
            return () => abortController.abort();
        }
    }, []);

    const handleChange = ({target}) => {
        setFormData(() => ({
            ...formData,
            [target.name]:target.value
        }))
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        let itemsToSubmit = [deck.id, formData, abortController.signal];
        let operativeFunction = createCard;
        if(edit){
            itemsToSubmit = [deck.id, formData, abortController.signal];
            operativeFunction = updateCard;
        }
        const handlingTheSubmit = async () => {
            try {
                const response = await operativeFunction(...itemsToSubmit);

                //replaces the card that was operated on from the temp deck with the post-op version
                tempDeck.cards = tempDeck.cards.filter((card) => card.id !== response.id);
                tempDeck.cards.push(response);
                setDeck({...tempDeck})
                
                //replaces the old version of the deck in the decks array with the new version
                tempDecks = tempDecks.filter((aDeck) => aDeck.id !== deck.id);
                tempDecks.push(tempDeck);
                setDecks([...tempDecks]);

                if(!edit) setFormData({front:"", back:""});
                else history.push(deckUrl);
            } catch (error) {
                if(error === "AbortError") console.log("aborted handlingTheSubmit");
                else throw error;
            }
        }
        handlingTheSubmit();
        return () => abortController.abort();
    }

    return (
        <form name="createDeck" onSubmit={handleSubmit}>
          <div className="front">
            <label htmlFor="front">Front</label>
            <textarea
              id="front"
              type="text"
              name="front"
              value={formData.front}
              placeholder="Front side of card"
              className="form-control"
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="back">Back</label>
            <textarea
              id="back"
              type="text"
              name="back"
              value={formData.back}
              placeholder="Back Side of card"
              className="form-control"
              onChange={handleChange}
            ></textarea>
          </div>
          <Link className="btn btn-secondary mr-1" to={deckUrl}>
            Done
          </Link>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      );

}