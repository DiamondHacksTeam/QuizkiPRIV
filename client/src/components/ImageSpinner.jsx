import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./ImageSpinner.css";

function ImageSpinner() {
  const location = useLocation();
  const images = ["Bath", "Sunday", "Toilet", "Work"];
  const intervals = [3000, 4000, 5000, 6000];
  const smiskis = {
    Bath: [
      "Shampooing",
      "Not_Looking",
      "Scrubbing",
      "With_Duck",
      "Dazed",
      "Looking",
    ],
    Toilet: [
      "Peek-A-Boo",
      "Little_(Smelly)",
      "Squatting",
      "Helping_Out",
      "Resting",
      "Holding_In",
    ],
    Sunday: [
      "Blowing_Bubbles",
      "Paper_Airplane",
      "Sunbathing",
      "Sing-Along",
      "Skateboarding",
      "Gardening",
    ],
    Work: [
      "Approving",
      "Researching",
      "Presenting",
      "Good_Idea",
      "On_the_Rord",
      "Group_Think",
    ],
    Exercising: ["Crunches", "Stretching", "Dumbbell", "Balance", "Aerobics"],
  };

  const [currentImage, setCurrentImage] = useState(images[0]);
  const [spinning, setSpinning] = useState(false);
  const [smiski, setSmiski] = useState(null);
  const [smiskiIndex, setSmiskiIndex] = useState(null);
  const { isAuthenticated, user } = useAuth0();

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

  const addSmiski = async (email, smiskiName) => {
    try {
      const response = await fetch(
        `http://localhost:5050/records/smiskis/${email}/${smiskiName}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response().json();
    } catch (error) {
      console.error("Error calling patch route: ", error);
    }
  };

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
        const finalSmiski = series[randomSmiskiIndex];
        setSmiski(finalSmiski);

        if (isAuthenticated && user?.email) {
          addSmiski(user.email, finalSmiski);
        }
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
