import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { readDeck, deleteCard, deleteDeck } from '../../utils/api/index';

function ViewDeck() {
    const { deckId } = useParams();
    const navigate = useNavigate();
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

    // Handler for deleting the deck
    const deleteDeckHandler = async () => {
        if (window.confirm("Are you sure you want to delete this deck?")) {
            try {
                await deleteDeck(deckId);
                navigate('/');
            } catch (error) {
                console.error("Failed to delete deck", error);
            }
        }
    };

    // Handler for deleting a card
    const deleteCardHandler = async (cardId) => {
        if (window.confirm("Are you sure you want to delete this card?")) {
            try {
                await deleteCard(cardId);
                setDeck((currentDeck) => ({
                    ...currentDeck,
                    cards: currentDeck.cards.filter((card) => card.id !== cardId),
                }));
            } catch (error) {
                console.error("Failed to delete card", error);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h1>{deck.name}</h1>
            <p>{deck.description}</p>
            <div className="mb-3">
                <Link to={`/decks/${deck.id}/edit`} className="btn btn-primary me-2">Edit</Link>
                <Link to={`/decks/${deck.id}/study`} className="btn btn-secondary me-2">Study</Link>
                <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-success me-2">Add Cards</Link>
                <button onClick={deleteDeckHandler} className="btn btn-danger">Delete</button>
            </div>
            <h2>Cards</h2>
            {deck.cards.map((card) => (
                <div key={card.id} className="card mb-3">
                    <div className="card-body">
                        <p className="card-text">{card.front}</p>
                        <p className="card-text">{card.back}</p>
                        <Link to={`/decks/${deck.id}/cards/${card.id}/edit`} className="btn btn-primary me-2">
                            Edit Card
                        </Link>
                        <button onClick={() => deleteCardHandler(card.id)} className="btn btn-danger">Delete</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ViewDeck;
