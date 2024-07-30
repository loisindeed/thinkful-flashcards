import {useState} from "react";
import React from 'react';

function CreateDeck() {
    const initialFormState = {
        name: "Deck Name",
        description: "Brief description of the deck",
    };
    const [formData, setFormData] = useState({ ...initialFormState });

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };
    return (
        <div>
            <h1>Create Deck</h1>
            <form>
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
    )
}

export default CreateDeck