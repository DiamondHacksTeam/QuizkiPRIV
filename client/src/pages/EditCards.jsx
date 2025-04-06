import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Hook for navigation between pages
import FlashcardList from '../components/FlashcardList.jsx'; // Component to display flashcards
import CreateFlashcard from '../components/CreateFlashcard.jsx'; // Component to create a flashcard
import './Create.css'; // CSS for styling the Create page

function Create() {
  // State to hold the flashcards
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS);

  // State to track the current page ('choose', 'create-group', 'create', or 'list')
  const [currentPage, setCurrentPage] = useState('choose');

  // State to track the selected group
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Extract unique groups from the sample flashcards
  const [groups, setGroups] = useState([...new Set(SAMPLE_FLASHCARDS.map((f) => f.group))]);

  // Hook to navigate between routes
  const navigate = useNavigate();

  // Function to add a new flashcard to the selected group
  const addFlashcard = (question, answer) => {
    const newFlashcard = {
      id: flashcards.length + 1,
      question,
      answer,
      group: selectedGroup,
    };
    setFlashcards([...flashcards, newFlashcard]);
    setCurrentPage('list'); // Navigate to the list page after adding
  };

  // Function to create a new group
  const createGroup = (groupName) => {
    if (!groups.includes(groupName)) {
      setGroups([...groups, groupName]);
      setSelectedGroup(groupName);
      setCurrentPage('create'); // Navigate to the create flashcard page
    }
  };

  return (
    <div className="app">
      {/* Choose page: Decide to create a group or add to an existing group */}
      {currentPage === 'choose' && (
        <div className="choose-container">
          <h2>What would you like to do?</h2>
          <button onClick={() => setCurrentPage('create-group')}>Create a New Group</button>
          <h3>Or choose an existing group:</h3>
          <div className="group-list">
            {groups.map((group) => (
              <button
                key={group}
                onClick={() => {
                  setSelectedGroup(group);
                  setCurrentPage('create');
                }}
              >
                {group}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Create group page */}
      {currentPage === 'create-group' && (
        <div className="create-group-container">
          <h2>Create a New Group</h2>
          <input
            type="text"
            placeholder="Enter group name"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value.trim() !== '') {
                createGroup(e.target.value.trim());
              }
            }}
          />
          <button onClick={() => setCurrentPage('choose')}>Back</button>
        </div>
      )}

      {/* Create flashcard page */}
      {currentPage === 'create' && (
        <CreateFlashcard addFlashcard={addFlashcard} />
      )}

      {/* Flashcard list page */}
      {currentPage === 'list' && <FlashcardList flashcards={flashcards} />}

      {/* Button to navigate to the Flashcards page */}
      <button className="view-flashcards-button" onClick={() => navigate('/flashcards')}>
        View Flashcards
      </button>
    </div>
  );
}

// Sample flashcards data
const SAMPLE_FLASHCARDS = [
  { id: 1, question: 'What is 2 + 2?', answer: '4', group: 'Math' },
  { id: 2, question: 'What is the capital of France?', answer: 'Paris', group: 'History' },
];

export default Create;