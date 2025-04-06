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
                <Link to="/collection">My Smiskis   
                <FaRegArrowAltCircleRight />
                </Link>
            </div>

            <div className="header-container">
                <Link to="/flashcards">My Flashcards   
                <FaRegArrowAltCircleRight />
                </Link>
            </div>
        </div>
    );
}
