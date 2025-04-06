import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ImageSpinner.css";

function ImageSpinner() {
  const location = useLocation();
  const images = ["Bath", "Sunday", "Toilet", "Work"];
  const intervals = [3000, 4000, 5000, 6000];
  const smiskis = {
    Bath: [
      "Shampoo",
      "Not Looking",
      "Scrubbing",
      "With Duck",
      "Dazed",
      "Looking",
    ],
    Toilet: [
      "Peek-A-Boo",
      "Little (Smelly)",
      "Squatting",
      "Helping Out",
      "Resting",
      "Holding In",
    ],
    Sunday: [
      "Blowing Bubbles",
      "Paper Airplane",
      "Sunbathing",
      "Sing-Along",
      "Skateboarding",
      "Gardening",
    ],
    Work: [
      "Approving",
      "Researching",
      "Presenting",
      "Good Idea",
      "On the Rord",
      "Group Think",
    ],
    "Wrong Universe!": ["Troll"],
  };

  const [currentImage, setCurrentImage] = useState(images[0]);
  const [spinning, setSpinning] = useState(false);
  const [smiski, setSmiski] = useState(null);
  const [smiskiIndex, setSmiskiIndex] = useState(null);

  const resetState = () => {
    setCurrentImage(images[0]);
    setSpinning(false);
    setSmiski(null);
  };

  useEffect(() => {
    resetState();
  }, [location.pathname]);

  useEffect(() => {
    function handlePageShow(event) {
      if (event.persisted) {
        resetState();
      }
    }

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  useEffect(() => {
    if (currentImage) {
      const series = smiskis[currentImage];
      setSmiskiIndex(Math.floor(Math.random() * series.length));
    }
  }, [currentImage]);

  const cycleImage = () => {
    if (spinning) {
      return;
    }

    setSpinning(true);

    const randomIntervalIndex = Math.floor(Math.random() * intervals.length);
    const duration = intervals[randomIntervalIndex];
    const intervalTime = 150;
    let elapsed = 0;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * images.length);
      setCurrentImage(images[randomIndex]);
      elapsed += intervalTime;

      if (elapsed >= duration) {
        clearInterval(interval);
        setSpinning(false);

        const finalImage = images[randomIndex];
        const series = smiskis[finalImage];
        const randomSmiskiIndex = Math.floor(Math.random() * series.length);
        setSmiski(series[randomSmiskiIndex]);
      }
    }, intervalTime);

    setSmiski(smiskis[smiskiIndex]);
  };

  return (
    <div className="spinnerContainer">
      <img src={`../../public/${currentImage}.png`} className="smiskiBox"></img>
      <button onClick={cycleImage} disabled={spinning}>
        {spinning ? "Spinning..." : "Spin"}
      </button>
      <p>
        {smiski === null || spinning
          ? ""
          : `Congrats! You got Smiski ${smiski} from the ${currentImage} series!`}
      </p>
    </div>
  );
}

export default ImageSpinner;
