import React, { useState } from 'react';
import Flashcard, { SAMPLE_FLASHCARDS } from './Flashcard.jsx';

const FlashcardList = () => {
  const [selectedGroup, setSelectedGroup] = useState(null); // Track the selected group
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0); // Track the current flashcard index

  // Extract unique groups from the flashcards dynamically
  const groups = [...new Set(SAMPLE_FLASHCARDS.map((flashcard) => flashcard.group))];

  // Filter flashcards by the selected group
  const filteredFlashcards = SAMPLE_FLASHCARDS.filter(
    (flashcard) => flashcard.group === selectedGroup
  );

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setCurrentFlashcardIndex(0); // Reset to the first flashcard in the group
  };

  const handleNextFlashcard = () => {
    setCurrentFlashcardIndex((prevIndex) => (prevIndex + 1) % filteredFlashcards.length);
  };

  const handlePreviousFlashcard = () => {
    setCurrentFlashcardIndex((prevIndex) =>
      prevIndex === 0 ? filteredFlashcards.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      {!selectedGroup ? (
        <div className="flashcard-groups">
          {groups.map((group) => (
            <button
              key={group}
              onClick={() => handleGroupClick(group)}
              className="group-button"
            >
              {group}
            </button>
          ))}
        </div>
      ) : filteredFlashcards.length > 0 ? (
        <div>
          <button onClick={() => setSelectedGroup(null)} className="back-button">
            Back to Groups
          </button>
          <div className="flashcard-container">
            <Flashcard flashcard={filteredFlashcards[currentFlashcardIndex]} />
          </div>
          <div className="navigation-buttons">
            <button onClick={handlePreviousFlashcard} className="prev-button">
              Previous
            </button>
            <button onClick={handleNextFlashcard} className="next-button">
              Next
            </button>
          </div>
        </div>
      ) : (
        <p>No flashcards available for this group.</p>
      )}
    </div>
  );
};

export default FlashcardList;
