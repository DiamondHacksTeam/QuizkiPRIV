import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import Flashcard from './Flashcarddata.jsx';
import './FlashCardList.css'

export default function FlashcardList() {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [SAMPLE_FLASHCARDS, setFlashcards] = useState([]);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth0();

  useEffect(() => {
    const fetchFlashcards = async () => {
      if (!user?.email) return;
      
      try {
        const response = await fetch(`http://localhost:5050/records/users/${user.email}`);
        const result = await response.json();
        const terms = result[0]?.terms || [];
        
        const formatted = terms.flatMap(languageGroup => {
          const [type, pairs] = Object.entries(languageGroup)[0];
          return Object.entries(pairs).map(([q, a], i) => ({
            id: `${type}-${i}`,
            question: q,
            answer: a,
            group: type.charAt(0).toUpperCase() + type.slice(1)
          }));
        });
        
        setFlashcards(formatted);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcards();
  }, [user?.email]);

  const groups = [...new Set(SAMPLE_FLASHCARDS.map((flashcard) => flashcard.group))];
  const filteredFlashcards = selectedGroup 
    ? SAMPLE_FLASHCARDS.filter((flashcard) => flashcard.group === selectedGroup)
    : [];

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setCurrentFlashcardIndex(0);
  };

  const handleNextFlashcard = () => {
    setCurrentFlashcardIndex((prevIndex) => (prevIndex + 1) % filteredFlashcards.length);
  };

  const handlePreviousFlashcard = () => {
    setCurrentFlashcardIndex((prevIndex) =>
      prevIndex === 0 ? filteredFlashcards.length - 1 : prevIndex - 1
    );
  };

  if (loading) return <div>Loading flashcards...</div>;

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
}