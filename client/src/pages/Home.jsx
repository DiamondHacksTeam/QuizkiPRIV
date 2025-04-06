import { Link } from "react-router-dom";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import "./Home.css";

export const Home = () => {
  return (
    <div>
      <div className="header-container">
        <h1>Quizki</h1>
      </div>
    

      <div className="header-container">
        <Link to="/collection">
          My Smiskis
          <FaRegArrowAltCircleRight />
        </Link>
      </div>

      <div className="smiski-preview">
        <div>
        <img src="../../public/sunday_garden.png" />
        <p>Smiski Gardening</p>
        </div>

        <div>
        <img src="../../public/exercise_dumbell.png" />
        <p>Smiski Dumbell</p>
        </div>

        <div>
        <img src="../../public/bath_duck.png" />
        <p>Smiski With Duck</p>
        </div>

        <div>
        <img src="../../public/toilet_rest.png" />
        <p>Smiski Resting</p>
        </div>

        <div>
        <img src="../../public/work_idea.png" />
        <p>Smiski Good Idea</p>
        </div>
      </div>

      <div className="header-container">
        <Link to="/flashcards">
          My Flashcards
          <FaRegArrowAltCircleRight />
        </Link>
      </div>
    </div>
  );
};
