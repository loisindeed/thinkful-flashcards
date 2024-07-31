import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { listDecks, deleteDeck } from './utils/api/index';
import DeckCard from './components/deck/DeckCard';

function Home() {
    const navigate = useNavigate();
    const [decks, setDecks] = useState([]); // decks to be displayed in a list

    // fetch decks
    useEffect(() => {
        const fetchDecks = async () => {
            const data = await listDecks();
            setDecks(data);
        };

        fetchDecks();
    }, []);

    // delete handler pass to DeckCard
    const deleteHandler = async (deckId) => {
        if (window.confirm("Delete this deck? You will not be able to recover it.")) {
            try {
                await deleteDeck(deckId);
                setDecks((currentDecks) => currentDecks.filter((deck) => deck.id !== deckId));
            } catch (error) {
                console.error("Failed to delete deck", error);
            }
        }
    };

    // create button and list of decks
    return (
        <div>
            <Link to={`/decks/new`}><button>Create Deck</button></Link>

            {decks.map((deck) => (
                <DeckCard key={deck.id} deck={deck} deleteHandler={deleteHandler}/>
            ))}
        </div>
    );
}

export default Home;