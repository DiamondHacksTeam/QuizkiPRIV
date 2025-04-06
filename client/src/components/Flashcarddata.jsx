import React, { useState } from 'react';

// Flashcards data
export const SAMPLE_FLASHCARDS = [
  { id: 1, question: 'What is 2 + 2?', answer: '4', group: 'Math' },
  { id: 2, question: 'What is the capital of France?', answer: 'Paris', group: 'History' },
  { id: 3, question: 'What is H2O?', answer: 'Water', group: 'Science' },
  { id: 4, question: 'What is 5 x 5?', answer: '25', group: 'Math' },
  { id: 5, question: 'Who discovered gravity?', answer: 'Isaac Newton', group: 'Science' },
];

const Flashcard = ({ flashcard }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className={`card ${isFlipped ? 'flip' : ''}`} onClick={() => setIsFlipped(!isFlipped)}>
      <div className="front">{flashcard.question}</div>
      <div className="back">{flashcard.answer}</div>
    </div>
  );
};

export default Flashcard;