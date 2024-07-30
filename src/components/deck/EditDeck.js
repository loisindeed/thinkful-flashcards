import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import { readDeck } from "../../utils/api/index";

function EditDeck() {
    const { deckId } = useParams();
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
                        name: foundDeck.name, // existing name
                        description: foundDeck.description, // existing description
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
    return (
        <div>
            <h1>Edit Deck</h1>
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
                <Link to={`/decks/${deckId}`}><button>Cancel</button></Link>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default EditDeck