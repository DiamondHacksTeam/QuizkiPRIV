import React, { useState } from 'react';
import FlashcardList from '../components/FlashcardList.jsx'; // Component to display a list of flashcards
import CreateFlashcard from '../components/CreateFlashcard.jsx'; // Component to create a new flashcard
import './Flashcards.css'; // CSS for styling the Flashcards page

function Flashcards() {
  // State to hold the sample flashcards
  const [flashcards] = useState(SAMPLE_FLASHCARDS);

  // State to track the current page ('list' or 'create')
  const [currentPage, setCurrentPage] = useState('');

  return (
    <div className="app">
      {/* If the current page is 'list', display the FlashcardList component */}
      {currentPage === 'list' && <FlashcardList flashcards={flashcards} />}

      {/* If the current page is 'create', display the CreateFlashcard component */}
      {currentPage === 'create' && <CreateFlashcard addFlashcard={flashcards} />}

      {/* If the current page is not 'list', show the "View Flashcards" button */}
      {currentPage !== 'list' && (
        <button onClick={() => setCurrentPage('list')}>View Flashcards</button>
      )}
    </div>
  );
}

// Sample flashcards data
const SAMPLE_FLASHCARDS = [
  {
    id: 1, // Unique identifier for the flashcard
    question: 'What is 2 + 2?', // Question displayed on the front of the flashcard
    answer: '4', // Answer displayed on the back of the flashcard
  },
  {
    id: 2, // Unique identifier for the flashcard
    question: 'Question 2', // Placeholder question
    answer: 'Answer', // Placeholder answer
  }
];

export default Flashcards;