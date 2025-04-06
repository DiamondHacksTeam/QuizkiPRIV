import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Study } from "./pages/study";
import { Collection } from "./pages/collection";
import { Gacha } from "./pages/gacha";
import { Home } from "./pages/Home";
import { Flashcards } from "./pages/Flashcards";
import { Profile } from "./pages/Profile";
import { Create } from "./pages/Create";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/study" element={<Study />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/gacha" element={<Gacha />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
