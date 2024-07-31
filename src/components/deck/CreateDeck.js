import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDeck } from '../../utils/api/index';

function CreateDeck() {
    const initialFormState = {
        name: "Deck Name",
        description: "Brief description of the deck",
    };
    const [formData, setFormData] = useState({ ...initialFormState });
    const navigate = useNavigate();

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newDeck = await createDeck(formData);
            navigate(`/decks/${newDeck.id}`);
        } catch (error) {
            console.error("Failed to create deck", error);
        }
    };

    return (
        <div>
            <h1>Create Deck</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    Name<br/>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={formData.name}
                    />
                </label>
                <br/>
                <label htmlFor="description">
                    Description <br/>
                    <textarea
                        id="description"
                        name="description"
                        onChange={handleChange}
                        value={formData.description}
                    />
                </label>
                <br/>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreateDeck;
