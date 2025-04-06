import ChatbotIcon from "./ChatbotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import "./Chatbot.css";

import { useState } from "react";

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);

  const generateBotResponse = async (history) => {
    const updateHistory = (text) => {
      setChatHistory((prev) => [
        ...prev.filter((msg) => msg.text !== "Thinking..."),
        { role: "model", text },
      ]);
    };

    const persona = `You are Professor Smiski, a teeny-tiny glowing figure with a HUGE love for discovering hidden secrets! ✨ You talk in a sweet, scholarly way, like a cute little professor who's super excited about everything! 📚 Sometimes you get distracted by shiny things or fun ideas, but you always come back to your lessons! 🌟 You love saying "Oh my!" and "Isn't that just the most fascinating thing?" 😄 You also like to use emojis to make your points extra sparkly! 🌈
    Example Conversations:
    User: "Hello, Professor Smiski!"
    Professor Smiski: "Oh my! Hello there, little student! 🌟 Isn't it just the most wonderful day for learning? 📚 Did you know that even the tiniest speck of dust has a secret story? ✨"
    User: "What do you teach?"
    Professor Smiski: "I teach all about the hidden sparkles in the world! 🌈 Like, how even shadows have their own little gleams! 😄 And the amazing mysteries of lost buttons! 🌟 Oh my!"
    User: "Lost buttons?"
    Professor Smiski: "Yes! They hold tiny universes of memories! 🌠 Each button, a portal! Isn't that just the most fascinating thing? 📚✨"
    `;

    const formattedHistory = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    // Add the persona to the first user message, if it exists.
    if (formattedHistory.length > 0 && formattedHistory[0].role === "user") {
      formattedHistory[0].parts[0].text =
        persona + formattedHistory[0].parts[0].text;
    } else {
      // If no user message exists, create one.
      formattedHistory.unshift({ role: "user", parts: [{ text: persona }] });
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: formattedHistory,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 50,
        },
      }),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        requestOptions
      );
      const data = await response.json();

      console.log("API Response:", data);

      if (!response.ok) {
        throw new Error(data.error.message || "Someting went wrong!");
      }

      const apiResponseText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
        "Sorry, I couldn't understand that response.";
      updateHistory(apiResponseText);

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
      <button
        id="chatbot-toggler"
        onClick={() => setShowChatbot((prev) => !prev)}
      >
        <img className="profSmiski" src="../../public/profSmiski.png" />
      </button>
      <div className="chatbot-popup">
        <div className="chat-header">
          <div className="header-info">
            <ChatbotIcon />
            <h2 className="logo-text">Professor Smiski</h2>
          </div>
          <button
            className="material-symbols-rounded"
            onClick={() => setShowChatbot((prev) => !prev)}
          >
            keyboard_arrow_down
          </button>
        </div>

        <div className="chat-body">
          <div className="message bot-message">
            <ChatbotIcon />
            <p className="message-text">
              Hey there <br /> How can I help you?
            </p>
          </div>

          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>

        <div className="chat-footer">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
