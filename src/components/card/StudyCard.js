import React, { useState } from 'react';

function StudyCard({ card, onNext }) {
    const [isFront, setIsFront] = useState(true);

    const handleFlip = () => {
        setIsFront(!isFront);
    };

    const handleNext = () => {
        if (!isFront) {
            onNext();
            setIsFront(true);
        } else {
            handleFlip();
        }
    };

    return (
        <div>
            <div>
                {isFront ? card.front : card.back}
            </div>
            <button onClick={handleFlip}>Flip</button>
            {!isFront && <button onClick={handleNext}>Next</button>}
        </div>
    );
}

export default StudyCard;
