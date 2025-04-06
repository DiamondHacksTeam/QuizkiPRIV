import React, { useState } from 'react';
import FlashcardList from '../components/FlashcardList.jsx';
import CreateFlashcard from '../components/CreateFlashcard.jsx';
import './Flashcards.css';

function Flashcards() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);
  const [currentPage, setCurrentPage] = useState('');

  return (
    <div className="app">
      {currentPage === 'list' && <FlashcardList flashcards={flashcards} />}
      {currentPage === 'create' && <CreateFlashcard addFlashcard={addFlashcard} />}
      {currentPage !== 'list' && (
        <button onClick={() => setCurrentPage('list')}>View Flashcards</button>
      )}
    </div>
  );
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: 'What is 2 + 2?',
    answer: '4',
  },
  {
    id: 2,
    question: 'Question 2',
    answer: 'Answer',
  }
];

export default Flashcards;