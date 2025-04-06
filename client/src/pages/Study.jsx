import React, { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import './Study.css';

export default function Study() {
    const [terms, setTerms] = useState([]); // Changed from questions to terms
    const [answers, setAnswers] = useState({}); // State to hold user answers
    const { user, isLoading } = useAuth0();

    async function fetchTerms() {
        try {
            const response = await fetch(`http://localhost:5050/records/users/${user.email}`);
            const result = await response.json();
            const userTerms = result[0]?.terms || [];
            
            // Flatten the terms structure
            const flattenedTerms = [];
            const initialAnswers = {};
            
            userTerms.forEach(languageObj => {
                Object.entries(languageObj).forEach(([language, terms]) => {
                    Object.entries(terms).forEach(([term, translation]) => {
                        flattenedTerms.push({
                            id: `${language}-${term}`, // Create unique ID
                            language,
                            term,
                            translation
                        });
                        initialAnswers[`${language}-${term}`] = '';
                    });
                });
            });
            
            setTerms(flattenedTerms);
            setAnswers(initialAnswers);
        } catch (error) {
            console.error("Error fetching terms:", error);
        }
    }

    const handleAnswerChange = (termId, value) => {
        setAnswers(prev => ({
            ...prev,
            [termId]: value
        }));
    };

    const handleSubmit = () => {
        // Calculate score
        let correct = 0;
        terms.forEach(term => {
            if (answers[term.id]?.toLowerCase() === term.translation.toLowerCase()) {
                correct++;
            }
        });
        
        const score = Math.round((correct / terms.length) * 100);
        alert(`You scored ${score}% (${correct} out of ${terms.length})`);
        if (score === 100){
            //increase points for 100% score
            fetch(`http://localhost:5050/records/balance/${user.email}/10`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            alert("You have received 10 points for scoring 100%!"); // Notify user of points
        }
    };

    useEffect(() => {
        if (user) {
            fetchTerms();
        }
    }, [user]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Please log in to view your study terms.</div>;
    }

    if (terms.length === 0) {
        return <div>No terms available for study. Please add some flashcards.</div>;
    }

    return (
        <div className='paper'>
            <h1>Practice Test</h1>
            <div className='questions-container'>
                {terms.map((term, index) => (
                    <div key={term.id} className="question-row">
                        <div className="question-number">
                            <h2>{index + 1}.</h2>
                        </div>
                        <div className="question-content">
                            <p>{term.term} ({term.language})</p>
                            <input 
                                type="text" 
                                value={answers[term.id] || ''}
                                onChange={(e) => handleAnswerChange(term.id, e.target.value)}
                                placeholder="Your answer..." 
                                className="answer-input"
                            />
                        </div>
                    </div>
                ))}
            </div>
            <button 
                className="submit-button" 
                onClick={handleSubmit}
                disabled={terms.length === 0}
            >
                Submit Answers
            </button>
        </div>
    );
}