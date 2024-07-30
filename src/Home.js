import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listDecks } from './utils/api/index';
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

    const handleCreate = () => {
        navigate('/decks/new');
    };

    // create button and list of decks
    return (
        <div>
            <button onClick={handleCreate}>Create Deck</button>

            {decks.map((deck) => (
                <DeckCard key={deck.id} deck={deck} />
            ))}
        </div>
    );
}

export default Home;