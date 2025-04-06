import React, { useState } from 'react'

const CreateFlashcard = ({ addFlashcard }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim() && answer.trim()) {
      addFlashcard(question, answer);
      setQuestion('');
      setAnswer('');
    } else {
      alert('Please fill in both fields.');
    }

  }
  return (
    <div className="create-flashcard">
      <h2>Create Flashcard</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question:</label>
          <input
            type = "text"
            value = {question}
            onChange = {(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Answer:</label>
          <input
            type = "text"
            value = {answer}
            onChange = {(e) => setAnswer(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Flashcard</button>
      </form>
    </div>
  )
}

export default CreateFlashcard
