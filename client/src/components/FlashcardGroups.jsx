import React from 'react';
import Flashcard from './Flashcard.jsx';

const FlashcardGroups= ({ flashcards, onDeleteFlashcard }) => {
    return (
        <div className="flashcard-groups">
            {flashcards.map((flashcard) => (
                <Flashcard
                    key={flashcard.id}
                    flashcard={flashcard}
                    onDeleteFlashcard={onDeleteFlashcard}
                />
            ))}
            <div className="flashcard-groups__add">
                <button onClick={() => onDeleteFlashcard()}>Add Flashcard</button>
            </div>
        </div>
    )
}   

const SAMPLE_FLASHCARD_GROUPS = [
    {
        id: 1,
        name: 'Math',
        flashcards: [
            { id: 1, Flashcard },
            { id: 2, Flashcard}
        ]
    },
    {
        id: 2,
        name: 'Language',
        flashcards: [
            { id: 3, Flashcard },
            { id: 4, Flashcard }
        ]
    }
]

export default FlashcardGroups;