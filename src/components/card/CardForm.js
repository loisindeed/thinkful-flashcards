import React from 'react';
import { Link } from 'react-router-dom';

function CardForm({ formData, handleChange, handleSubmit, deckId }) {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="front">
                    Front <br/>
                    <textarea
                        id="front"
                        name="front"
                        onChange={handleChange}
                        value={formData.front}
                        placeholder="Front side of card"
                    />
                </label>
                <br/>
                <label htmlFor="back">
                    Back<br/>
                    <textarea
                        id="back"
                        name="back"
                        onChange={handleChange}
                        value={formData.back}
                        placeholder="Back side of card"
                    />
                </label>
                <br/>
                <Link to={`/decks/${deckId}`}><button type="button">Cancel</button></Link>
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default CardForm;
