import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { readDeck, updateCard } from '../../utils/api/index';
import CardForm from './CardForm';

function EditCard() {
    const { deckId, cardId } = useParams();
    const initialFormState = {
        front: "",
        back: "",
    };
    const [formData, setFormData] = useState(initialFormState);
    const [deck, setDeck] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const abortController = new AbortController();

        const fetchDeck = async () => {
            try {
                const fetchedDeck = await readDeck(deckId, abortController.signal);
                setDeck(fetchedDeck);
                const fetchedCard = fetchedDeck.cards.find(card => card.id === parseInt(cardId));
                if (fetchedCard) {
                    setFormData({
                        front: fetchedCard.front,
                        back: fetchedCard.back,
                    });
                }
                setIsLoading(false);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Failed to fetch deck or card', error);
                }
            }
        };

        fetchDeck();

        return () => {
            abortController.abort();
        };
    }, [deckId, cardId]);

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        try {
            await updateCard({ ...formData, id: cardId, deckId: parseInt(deckId) }, abortController.signal);
            navigate(`/decks/${deckId}`);
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Failed to update card', error);
            }
        }
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <h1>{deck.name}</h1>
            <h2>Edit Card</h2>
            <CardForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                deckId={deckId}
            />
        </div>
    );
}

export default EditCard;