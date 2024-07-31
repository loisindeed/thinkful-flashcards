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
        <div>
            <h2>{name}</h2>
            <p>{description}</p>
            <p>{cards.length} cards</p>
            <Link to={`/decks/${deck.id}`}><button>View</button></Link>
            <Link to={`/decks/${deck.id}/study`}><button>Study</button></Link>
            <button onClick={() => deleteHandler(deck.id)}>Delete</button>
        </div>
    );
};

export default DeckCard;