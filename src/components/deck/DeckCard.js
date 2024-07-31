import React from 'react';
import { Link } from 'react-router-dom';

// component for card to be shown in Home
const DeckCard = ({ deck, deleteHandler }) => {
    if (!deck) {
        return <p>Deck not found.</p>;
    }

    const { name = 'No Name', description = 'No Description', cards = [] } = deck; // destructuring

    // shows number of cards, name, description, view button, study button and delete button
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p className="card-text">{description}</p>
                <p className="card-text">{cards.length} cards</p>
                <Link to={`/decks/${deck.id}`} className="btn btn-primary me-2">View</Link>
                <Link to={`/decks/${deck.id}/study`} className="btn btn-secondary me-2">Study</Link>
                <button onClick={() => deleteHandler(deck.id)} className="btn btn-danger">Delete</button>
            </div>
        </div>
    );
};

export default DeckCard;
