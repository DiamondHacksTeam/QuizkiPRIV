import React, { useState } from 'react';
import Flashcard, { SAMPLE_FLASHCARDS } from './Flashcarddata.jsx'; // Import the Flashcard component and sample data
import './FlashCardList.css'

const FlashcardList = () => {
  // State to track the selected group of flashcards
  const [selectedGroup, setSelectedGroup] = useState(null);

  // State to track the index of the currently displayed flashcard
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);

  // Extract unique groups from the flashcards dynamically
  const groups = [...new Set(SAMPLE_FLASHCARDS.map((flashcard) => flashcard.group))];

  // Filter flashcards by the selected group
  const filteredFlashcards = SAMPLE_FLASHCARDS.filter(
    (flashcard) => flashcard.group === selectedGroup
  );

  // Function to handle when a group is clicked
  const handleGroupClick = (group) => {
    setSelectedGroup(group); // Set the selected group
    setCurrentFlashcardIndex(0); // Reset to the first flashcard in the group
  };

  // Function to navigate to the next flashcard in the group
  const handleNextFlashcard = () => {
    setCurrentFlashcardIndex((prevIndex) => (prevIndex + 1) % filteredFlashcards.length);
  };

  // Function to navigate to the previous flashcard in the group
  const handlePreviousFlashcard = () => {
    setCurrentFlashcardIndex((prevIndex) =>
      prevIndex === 0 ? filteredFlashcards.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      {/* If no group is selected, display the list of groups */}
      {!selectedGroup ? (
        <div className="flashcard-groups">
          {groups.map((group) => (
            <button
              key={group} // Unique key for each group button
              onClick={() => handleGroupClick(group)} // Set the selected group when clicked
            >
              {group} {/* Display the group name */}
            </button>
          ))}
        </div>
      ) : filteredFlashcards.length > 0 ? (
        <div>
          {/* Button to go back to the group selection */}
          <button onClick={() => setSelectedGroup(null)} className="back-button">
            Back to Groups
          </button>

          {/* Display the current flashcard */}
          <div className="flashcard-container">
            <Flashcard flashcard={filteredFlashcards[currentFlashcardIndex]} />
          </div>

          {/* Navigation buttons for previous and next flashcards */}
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
        // Message displayed if no flashcards are available for the selected group
        <p>No flashcards available for this group.</p>
      )}
    </div>
  );
};

export default FlashcardList;
