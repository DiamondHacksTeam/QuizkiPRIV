import React, { useState } from 'react';
import './CreateFlashcard.css'; // Import CSS for styling

const CreateFlashcard = ({ addFlashcard }) => {
  // State to store the question input
  const [question, setQuestion] = useState('');
  // State to store the answer input
  const [answer, setAnswer] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (question.trim() && answer.trim()) {
      // If both fields are filled, add the flashcard
      addFlashcard(question, answer);
      setQuestion(''); // Clear the question input field
      setAnswer(''); // Clear the answer input field
    } else {
      // Alert the user if either field is empty
      alert('Please fill in both fields.');
    }
  };

  return (
    <div className="create-flashcard">
      <h2>Create Flashcard</h2>
      {/* Form to create a new flashcard */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question:</label>
          {/* Input field for the question */}
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)} // Update the question state
            required // Make the field required
          />
        </div>
        <div>
          <label>Answer:</label>
          {/* Input field for the answer */}
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)} // Update the answer state
            required // Make the field required
          />
        </div>
        {/* Button to submit the form */}
        <button type="submit">Add Flashcard</button>
      </form>
    </div>
  );
};

export default CreateFlashcard;
