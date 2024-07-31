import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDeck } from '../../utils/api/index';

function CreateDeck() {
    const initialFormState = {
        name: "",
        description: "",
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
        <div className="container mt-4">
            <h1>Create Deck</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Deck Name"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.name}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Brief description of the deck"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.description}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default CreateDeck;
