import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const { user } = useAuth0();
  const navigate = useNavigate();

  const [smiskis, setSmiskis] = useState([]); // State for unlocked Smiskis
  const [flashcards, setFlashcards] = useState([]); // State for flashcards
  const [loading, setLoading] = useState(true);

  // Fetch Smiskis and Flashcards
  useEffect(() => {
    const fetchData = async () => {
      if (!user?.email) return;

      try {
        // Fetch unlocked Smiskis
        const smiskisResponse = await fetch(
          `http://localhost:5050/records/smiskis/${user.email}`
        );
        const smiskisData = await smiskisResponse.json();

        // Fetch flashcards
        const flashcardsResponse = await fetch(
          `http://localhost:5050/records/users/${user.email}`
        );
        const flashcardsData = await flashcardsResponse.json();
        const terms = flashcardsData[0]?.terms || [];

        const formattedFlashcards = terms.flatMap((languageGroup) => {
          const [type, pairs] = Object.entries(languageGroup)[0];
          return Object.entries(pairs).map(([q, a], i) => ({
            id: `${type}-${i}`,
            question: q,
            answer: a,
            group: type.charAt(0).toUpperCase() + type.slice(1),
          }));
        });

        setSmiskis(smiskisData);
        setFlashcards(formattedFlashcards);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.email]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="home-page">
      {/* Smiskis Collection Preview */}
      <section className="smiskis-preview">
        <h2>Smiskis ➕</h2>
        <div className="smiskis-grid">
          {smiskis.length > 0 ? (
            smiskis.slice(0, 5).map((smiski, index) => (
              <div key={index} className="smiski-item">
                <img
                  src={`../../public/smiskis/${smiski}.png`}
                  alt={smiski}
                  className="smiski-image"
                />
                <p>{smiski.replace(/_/g, " ")}</p>
              </div>
            ))
          ) : (
            <p>No Smiskis unlocked yet.</p>
          )}
        </div>
        <button onClick={() => navigate("/smiskis")}>View All Smiskis</button>
      </section>

      {/* Flashcards Preview */}
      <section className="flashcards-preview">
        <h2>My Flashcards ➕</h2>
        <div className="flashcards-grid">
          {flashcards.length > 0 ? (
            flashcards.slice(0, 5).map((flashcard) => (
              <div key={flashcard.id} className="flashcard-item">
                <p className="flashcard-question">{flashcard.question}</p>
                <p className="flashcard-answer">{flashcard.answer}</p>
              </div>
            ))
          ) : (
            <p>No flashcards available.</p>
          )}
        </div>
        <button onClick={() => navigate("/flashcards")}>View All Flashcards</button>
      </section>
    </div>
  );
}

export default HomePage;