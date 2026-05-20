import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LangProvider } from "./LangContext";
import Navbar from "./components/Navbar";
import LandingPopup from "./components/LandingPopup";
import Home from "./pages/Home";
import About from "./pages/About";
import GamesHub from "./pages/GamesHub";
import SuikaGame from "./games/SuikaGame";
import QuizGame from "./games/QuizGame";
import MemoryGame from "./games/MemoryGame";

export default function App() {
  const [popupDone, setPopupDone] = useState(false);

  return (
    <LangProvider>
      <BrowserRouter>
        {!popupDone && <LandingPopup onDone={() => setPopupDone(true)} />}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/games" element={<GamesHub />} />
          <Route path="/games/suika" element={<SuikaGame />} />
          <Route path="/games/quiz" element={<QuizGame />} />
          <Route path="/games/memory" element={<MemoryGame />} />
        </Routes>
      </BrowserRouter>
    </LangProvider>
  );
}
