import { Link } from "react-router-dom";
import style from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={style.buttonContainer}>
      <Link to="/home">
        <button className={style.btn}>Home</button>
      </Link>
    </div>
  );
};

export default LandingPage;
