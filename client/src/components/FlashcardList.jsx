import React, { useState } from 'react';
import Flashcard from './Flashcard.jsx';
import FlashcardGroups from './FlashcardGroups.jsx';

const FlashcardList = ({ flashcards }) => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const groups = ['Math', 'Science', 'History'];

  const filteredFlashcards = flashcards.filter(
    (flashcard) => flashcard.group === selectedGroup
  );

  return (
    <div>
      {!selectedGroup ? (
        <div className="flashcard-groups">
          {groups.map((group) => (
            <button
              key={group}
              onClick={() => setSelectedGroup(group)}
              className="group-button"
            >
              {group}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => setSelectedGroup(null)} className="back-button">
            Back to Groups
          </button>
          <div className="card-grid">
            {filteredFlashcards.map((flashcard) => (
              <Flashcard flashcard={flashcard} key={flashcard.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardList;
