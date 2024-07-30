import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { readDeck } from '../../utils/api/index';

function ViewDeck() {
    const { deckId } = useParams(); // specific deck you are on
    const [deck, setDeck] = useState(null);

    useEffect(() => {
        const fetchDeck = async () => {
            try {
                const fetchedDeck = await readDeck(deckId);
                setDeck(fetchedDeck);
            } catch (error) {
                console.error('Failed to fetch deck', error);
            }
        };

        fetchDeck();
    }, [deckId]);

    if (!deck) return <p>Loading...</p>;

    return (
        <div>
            <p>This is the ViewDeck component for deckId: {deckId}</p>
            <h1>{deck.name}</h1>
            <p>{deck.description}</p>
            <Link to={`/decks/${deck.id}/edit`}><button>Edit</button></Link>
            <Link to={`/decks/${deck.id}/study`}><button>Study</button></Link>
            <Link to={`/decks/${deck.id}/cards/new`}><button>Add Cards</button></Link>
            <button>Delete</button>
            <br/>
            <h1>Cards</h1>
            {deck.cards.map((card) => (
                <div key={card.id}>
                    <h3>Card {card.id}</h3>
                    <p>{card.front}</p>
                    <p>{card.back}</p>
                    <Link to={`/decks/${deck.id}/cards/${card.id}/edit`}>
                        <button>Edit Card</button>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default ViewDeck;