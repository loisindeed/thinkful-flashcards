import React from 'react';
import { Link } from 'react-router-dom';

function CardForm({ formData, handleChange, handleSubmit, deckId }) {
    return (
        <div className="container mt-4">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="front" className="form-label">Front</label>
                    <textarea
                        id="front"
                        name="front"
                        onChange={handleChange}
                        value={formData.front}
                        placeholder="Front side of card"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="back" className="form-label">Back</label>
                    <textarea
                        id="back"
                        name="back"
                        onChange={handleChange}
                        value={formData.back}
                        placeholder="Back side of card"
                        className="form-control"
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <Link to={`/decks/${deckId}`} className="btn btn-secondary">Cancel</Link>
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    );
}

export default CardForm;
