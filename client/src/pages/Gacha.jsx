import "./gacha.css";
import ImageSpinner from "../components/ImageSpinner";

export const Gacha = () => {
  return (
    <div className="gachaContainer">
      <h1>Gacha</h1>
      <ImageSpinner />
      <p>100 Points to Play</p>
    </div>
  );
};
