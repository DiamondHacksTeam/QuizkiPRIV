import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

// Flashcards data

// async function getTerms(){
//   const { user } = useAuth0();
//   let response = await fetch(`https://localhost:5050/records/users/${user.email}`);
//   const result = await response.json();
//   let terms = result[0].terms;

//   let questions = [];
//   let answers = [];
//   let groups = [];

//   let flashcards = [];
//   terms.forEach(languageGroup => {
//     const languageType = Object.keys(languageGroup)[0];
//     const termPairs = languageGroup[languageType];
    
//     Object.entries(termPairs).forEach(([question, answer]) => {
//       questions.push(question);
//       answers.push(answer);
//       groups.push(languageType);
//     });
//   });
// }
// export const SAMPLE_FLASHCARDS = [
  
//   { id: 1, question: 'What is 2 + 2?', answer: '4', group: 'Math' },
//   { id: 2, question: 'What is the capital of France?', answer: 'Paris', group: 'History' },
//   { id: 3, question: 'What is H2O?', answer: 'Water', group: 'Science' },
//   { id: 4, question: 'What is 5 x 5?', answer: '25', group: 'Math' },
//   { id: 5, question: 'Who discovered gravity?', answer: 'Isaac Newton', group: 'Science' },
// ];

export async function SAMPLE_FLASHCARD(){
  const { user } = useAuth0();
  let response = await fetch(`https://localhost:5050/records/users/${user.email}`);
  const result = await response.json();
  let terms = result[0].terms;

  let ans = [];
  const formatted = terms.flatMap(languageGroup => {
    const [type, pairs] = Object.entries(languageGroup)[0];
    return Object.entries(pairs).map(([q, a], i) => ({
      id: `${type}-${i}`,
      question: q,
      answer: a,
      group: type.charAt(0).toUpperCase() + type.slice(1)
    }));
  });
  return ans;
}

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