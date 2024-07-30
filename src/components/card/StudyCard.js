import React, { useState, useEffect } from 'react';

function StudyCard({ card, cardIndex, totalCards, onNext }) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };
    const handleNext = () => {
        setIsFlipped(false); // reset the flip state
        onNext();
    };

    useEffect(() => {
        setIsFlipped(false);
    }, [cardIndex]);

    return (
        <div>
            <p>{isFlipped ? card.back : card.front}</p>
            <button onClick={handleFlip}>Flip</button>
            {isFlipped && cardIndex < totalCards - 1 && (
                <button onClick={handleNext}>Next</button>
            )}
        </div>
    );
}

export default StudyCard;