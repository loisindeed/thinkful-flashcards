import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { readDeck, createCard } from '../../utils/api/index';
import CardForm from './CardForm';

function CreateCard() {
    const { deckId } = useParams();
    const initialFormState = {
        front: "Front side of card",
        back: "Back side of card",
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
                setIsLoading(false);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Failed to fetch deck', error);
                }
            }
        };
        fetchDeck();

        return () => {
            abortController.abort();
        };
    }, [deckId]);

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
            await createCard(deckId, { ...formData }, abortController.signal);
            navigate(`/decks/${deckId}`);
        } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Failed to create card', error);
            }
        }
    };

    if (isLoading) return <p>Loading...</p>;

    return (
        <div>
            <h1>{deck.name}: Add Card</h1>
            <CardForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                deckId={deckId}
            />
        </div>
    );
}

export default CreateCard;