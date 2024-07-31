import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api/index";

function EditDeck() {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const initialFormState = {
        name: "",
        description: "",
    };
    const [formData, setFormData] = useState({ ...initialFormState });

    useEffect(() => {
        const fetchDeck = async () => {
            try {
                const foundDeck = await readDeck(deckId);
                if (foundDeck) {
                    setFormData({
                        name: foundDeck.name,
                        description: foundDeck.description,
                    });
                }
            } catch (error) {
                console.error("Failed to fetch deck", error);
            }
        };

        fetchDeck();
    }, [deckId]);

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await updateDeck({ ...formData, id: deckId });
            navigate(`/decks/${deckId}`);
        } catch (error) {
            console.error("Failed to update deck", error);
        }
    };

    return (
        <div className="container mt-4">
            <h1>Edit Deck</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.name}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.description}
                    />
                </div>
                <div className="d-flex justify-content-between">
                    <Link to={`/decks/${deckId}`} className="btn btn-secondary">Cancel</Link>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
}

export default EditDeck;
