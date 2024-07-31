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
        <div className="card mb-3">
            <div className="card-body">
                <div className="card-text">
                    {isFront ? card.front : card.back}
                </div>
                <button onClick={handleFlip} className="btn btn-secondary me-2">Flip</button>
                {!isFront && <button onClick={handleNext} className="btn btn-primary">Next</button>}
            </div>
        </div>
    );
}

export default StudyCard;
