// edit form that will be used by CreateCard and EditCard
import React from 'react';
import { Link } from 'react-router-dom';

function CardForm({ formData, handleChange, handleSubmit, deckId }) {
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="front">
                Front <br/>
                <textarea
                    id="front"
                    name="front"
                    onChange={handleChange}
                    value={formData.front || ""}
                />
            </label>
            <br/>
            <label htmlFor="back">
                Back<br/>
                <textarea
                    id="back"
                    name="back"
                    onChange={handleChange}
                    value={formData.back || ""}
                />
            </label>
            <br/>
            <Link to={`/decks/${deckId}`}><button type="button">Cancel</button></Link>
            <button type="submit">Save</button>
        </form>
    );
}

export default CardForm;