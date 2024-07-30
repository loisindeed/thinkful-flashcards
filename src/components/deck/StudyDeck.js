import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { readDeck } from '../../utils/api/index';
import StudyCard from '../card/StudyCard';

function StudyDeck() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState(null);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);

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

    const handleNext = () => {
        setCurrentCardIndex((prevIndex) => prevIndex + 1);
    };

    if (!deck) return <p>Loading...</p>;

    if (deck.cards.length <= 2) {
        return (
            <div>
                <h1>{deck.name}</h1>
                <h2>Not enough cards.</h2>
                <Link to={`/decks/${deckId}/cards/new`}>
                    <button>Add Cards</button>
                </Link>
            </div>
        );
    }

    const currentCard = deck.cards[currentCardIndex];

    return (
        <div>
            <h1>{deck.name}</h1>
            <p>{deck.description}</p>
            <h2>Card {currentCardIndex + 1} of {deck.cards.length}</h2>
            {currentCard && (
                <StudyCard
                    card={currentCard}
                    cardIndex={currentCardIndex}
                    totalCards={deck.cards.length}
                    onNext={handleNext}
                />
            )}
        </div>
    );
}

export default StudyDeck;