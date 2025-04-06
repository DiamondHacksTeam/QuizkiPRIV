import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Hook for navigation
import FlashcardList from "../components/FlashcardList.jsx"; // Component to display a list of flashcards
import CreateFlashcard from "../components/CreateFlashcard.jsx"; // Component to create a new flashcard
import "./MyFlashcards.css"; // CSS for styling the Flashcards page
import { useAuth0 } from "@auth0/auth0-react";
import Chatbot from "../components/Chatbot.jsx";

function Flashcards() {
  // State to hold the sample flashcards
  const [flashcards, setFlashcards] = useState([]);
  const { user } = useAuth0();

  useEffect(() => {
    const fetchFlashcards = async () => {
      if (!user?.email) return;

      try {
        const response = await fetch(
          `http://localhost:5050/records/users/${user.email}`
        );
        const result = await response.json();
        const terms = result[0]?.terms || [];

        const formatted = terms.flatMap((languageGroup) => {
          const [type, pairs] = Object.entries(languageGroup)[0];
          return Object.entries(pairs).map(([q, a], i) => ({
            id: `${type}-${i}`,
            question: q,
            answer: a,
            group: type.charAt(0).toUpperCase() + type.slice(1),
          }));
        });

        setFlashcards(formatted);
      } catch (error) {
        console.error("Error fetching flashcards:", error);
      }
    };

    fetchFlashcards();
  }, [user?.email]);

  // State to track the current page ('list' or 'create')
  const [currentPage, setCurrentPage] = useState("list"); // Default to 'list' to show groups immediately

  // Extract unique groups from the flashcards
  const groups = [...new Set(flashcards.map((flashcard) => flashcard.group))];

  // Hook to navigate between pages
  const navigate = useNavigate();

  return (
    <div className="app">
      {/* If there are no groups, display a button to navigate to the Edit Flashcards page */}
      {groups.length === 0 ? (
        <div className="no-groups">
          <p>
            No terms available for study. Please add some flashcards to get
            started!
          </p>
          <button
            onClick={() => navigate("/create")}
            className="edit-flashcards-button"
          >
            Edit Flashcards
          </button>
        </div>
      ) : (
        <>
          {/* If the current page is 'list', display the FlashcardList component */}
          {currentPage === "list" && <FlashcardList flashcards={flashcards} />}

          {/* If the current page is 'create', display the CreateFlashcard component */}
          {currentPage === "create" && (
            <CreateFlashcard addFlashcard={flashcards} />
          )}
        </>
      )}
      <Chatbot />
    </div>
  );
}

export default Flashcards;
