import React, { useState } from 'react';

const Flashcard = ({ flashcard }) =>{
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className={`card ${isFlipped ? 'flip' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
        <div className="front">
            {flashcard.question}
        </div>
        <div className='back'>{flashcard.answer}</div>
    </div>
  )
}

export default Flashcard;