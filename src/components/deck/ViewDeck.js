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
        <div>
            <p>This is the ViewDeck component for deckId: {deckId}</p>
            <h1>{deck.name}</h1>
            <p>{deck.description}</p>
            <Link to={`/decks/${deck.id}/edit`}><button>Edit</button></Link>
            <Link to={`/decks/${deck.id}/study`}><button>Study</button></Link>
            <Link to={`/decks/${deck.id}/cards/new`}><button>Add Cards</button></Link>
            <button onClick={deleteDeckHandler}>Delete</button>
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
                    <button onClick={() => deleteCardHandler(card.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}

export default ViewDeck;
