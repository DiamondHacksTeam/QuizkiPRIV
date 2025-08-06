# Quizski: The Gamified Learning Platform 🕹️📚

**Quizski** is an innovative MERN stack application developed in just 24 hours for UCSD's annual hackathon, DiamondHacks. Our platform merges the addictive fun of gacha games and blind box collectibles with the essential task of studying, transforming a tedious chore into a rewarding and engaging experience for students.

## 🌟 About the Project

Inspired by the massive popularity of gacha games and blind box collectibles like Smiskis, we sought to address the common struggle of staying motivated while studying. We combined the excitement of random rewards with the need for consistent practice to create a learning tool that students would genuinely look forward to using.

Quizski allows users to create their own custom flashcards and then take practice tests generated from that content. Based on their performance, they earn points that can be spent on our in-app gacha system. This system allows them to open "blind boxes" and collect a full set of digital Smiskis, gamifying the learning process and providing a tangible reward for their hard work.

## 🚀 Key Features

* **Custom Flashcard Creation:** Students can easily input their own terms and definitions to create personalized study sets.

* **Interactive Tutor Chatbox:** A custom, personality-driven chatbot powered by the Google Gemini API provides an interactive study experience.

* **Gemini-Powered Practice Tests:** The Google Gemini API is leveraged to generate dynamic and relevant practice tests based on the created flashcards.

* **Performance-Based Point System:** Points are awarded based on quiz performance, directly tying effort to reward.

* **Interactive Gacha System:** Spend earned points to open blind boxes and collect a variety of digital Smiskis.

* **Comprehensive Smiski Collection:** Track your progress as you collect all the unique Smiskis available on the platform.

* **User Authentication:** Secure user accounts are managed with Auth0, ensuring a safe and personalized experience.

## 🛠️ Technologies & Tools

This project was built using the following technologies:

* **MongoDB:** A NoSQL database used to store all application data, including user stats, flashcard sets, and Smiski collection details.

* **Express.js:** Our backend framework for building the API and handling routing, serving data to the front end.

* **React.js:** The front-end library used to build the responsive and dynamic user interface.

* **Node.js:** The runtime environment for our server-side logic and Express.js framework.

* **Auth0:** A powerful identity and access management solution used for secure user authentication and authorization.

* **Google Gemini API:** Utilized for both generating dynamic practice tests and powering an interactive, personality-driven tutor chatbot.

* **motion.dev:** A fantastic animation library used to create smooth, eye-catching UI animations and enhance the user experience, especially for the gacha system.

## 🔗 Devpost Submission

You can view our original submission and presentation on Devpost:
<https://devpost.com/software/quizme-bjn8dk>

## 👤 Team

* [Emanuel Nader](https://github.com/EmanuelNader)

* [Jordan Junaidi](https://github.com/JordanJunaidi)

* [Jayden Tan](https://github.com/jaytan3966)

* [Amy Trinh](https://github.com/amytrinh334)

## ⚙️ Getting Started

### Prerequisites

* Node.js (LTS version recommended)

* npm

* MongoDB Atlas account (or a local MongoDB instance)

* Auth0, Google Gemini API, and motion.dev credentials

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/quizski.git](https://github.com/your-username/quizski.git)
    cd quizski
    ```

2.  **Install dependencies for both client and server:**
    ```bash
    # In the root directory, for the server
    npm install

    # In the client directory
    cd client
    npm install
    ```

3.  **Set up environment variables:**
    * Create a `.env` file in the root directory and add your MongoDB connection string, Auth0 credentials, and Gemini API key.

4.  **Run the application:**
    ```bash
    # Start the server (from the root directory)
    npm start

    # Start the client (from the client directory)
    cd client
    npm start
    ```
