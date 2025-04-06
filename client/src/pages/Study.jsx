import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import "./Study.css";

export default function Study() {
  const [terms, setTerms] = useState([]); // All terms fetched from the backend
  const [groupedTerms, setGroupedTerms] = useState({}); // Terms grouped by language
  const [selectedGroup, setSelectedGroup] = useState(null); // Selected group for the test
  const [answers, setAnswers] = useState({}); // User answers
  const { user, isLoading } = useAuth0();
  const navigate = useNavigate();

  // Fetch terms from the backend
  async function fetchTerms() {
    try {
      const response = await fetch(`http://localhost:5050/records/users/${user.email}`);
      const result = await response.json();
      const userTerms = result[0]?.terms || [];

      const grouped = {};
      const initialAnswers = {};

      userTerms.forEach((languageObj) => {
        Object.entries(languageObj).forEach(([language, terms]) => {
          grouped[language] = grouped[language] || [];
          Object.entries(terms).forEach(([term, translation]) => {
            const termObj = {
              id: `${language}-${term}`, // Unique ID
              language,
              term,
              translation,
            };
            grouped[language].push(termObj);
            initialAnswers[`${language}-${term}`] = ""; // Initialize answers
          });
        });
      });

      setTerms(userTerms);
      setGroupedTerms(grouped);
      setAnswers(initialAnswers);
    } catch (error) {
      console.error("Error fetching terms:", error);
    }
  }

  // Handle answer input changes
  const handleAnswerChange = (termId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [termId]: value,
    }));
  };

  // Handle test submission
  const handleSubmit = () => {
    let correct = 0;
    const selectedTerms = groupedTerms[selectedGroup] || [];

    selectedTerms.forEach((term) => {
      if (answers[term.id]?.toLowerCase() === term.translation.toLowerCase()) {
        correct++;
      }
    });

    const score = Math.round((correct / selectedTerms.length) * 100);
    alert(`You scored ${score}% (${correct} out of ${selectedTerms.length})`);

    if (score === 100) {
      // Award points for a perfect score
      fetch(`http://localhost:5050/records/balance/${user.email}/10`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("You have received 10 points for scoring 100%!");
    }
  };

  // Fetch terms when the user logs in
  useEffect(() => {
    if (user) {
      fetchTerms();
    }
  }, [user]);

  if (isLoading) return <div className="loading">Loading...</div>;

  if (!user) return <div className="text">Please log in to view your study terms.</div>;

  if (Object.keys(groupedTerms).length === 0) {
    return (
      <div className="no-groups">
        <p>No terms available for study. Please add some flashcards to get started!</p>
        <button onClick={() => navigate("/create")} className="edit-flashcards-button">
          Edit Flashcards
        </button>
      </div>
    );
  }

  return (
    <div className="study-page">
      {!selectedGroup ? (
        <div className="group-selection">
          <h2>Select a Group to Start the Test</h2>
          <div className="group-buttons">
            {Object.keys(groupedTerms).map((group) => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                className="group-button"
              >
                {group}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="test-container">
          <h1>Test: {selectedGroup}</h1>
          <div className="questions-container">
            {groupedTerms[selectedGroup].map((term, index) => (
              <div key={term.id} className="question-row">
                <div className="question-number">
                  <h2>{index + 1}.</h2>
                </div>
                <div className="question-content">
                  <p>{term.term}</p> {/* Removed the group name */}
                  <input
                    type="text"
                    value={answers[term.id] || ""}
                    onChange={(e) => handleAnswerChange(term.id, e.target.value)}
                    placeholder="Your answer..."
                    className="answer-input"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="test-buttons">
            <button className="submit-button" onClick={handleSubmit}>
              Submit Answers
            </button>
            <button
              className="back-button"
              onClick={() => setSelectedGroup(null)}
            >
              Back to Group Selection
            </button>
          </div>
        </div>
      )}
    </div>
  );
}