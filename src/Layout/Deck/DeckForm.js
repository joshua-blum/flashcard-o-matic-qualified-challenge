import React from "react";
import {Link} from "react-router-dom";

export default function DeckForm({changeHandler, submitHandler, nameOfForm, formData}){

    return (
        <form name={nameOfForm} onSubmit={submitHandler}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    onChange={changeHandler}
                    value={formData.name}
                    placeholder="Deck Name"
                    className="form-control"
                    />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    type="text"
                    name="description"
                    value={formData.description}
                    placeholder="Brief description of the deck"
                    className="form-control"
                    onChange={changeHandler}
                    ></textarea>
            </div>
            <Link to='/' className="btn btn-secondary mr-1" >
                Cancel
            </Link>
            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    )
}