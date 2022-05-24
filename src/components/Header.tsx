import sunImg from "../todo-app-main/images/icon-sun.svg";
import "./Header.css";

const Header = () => {
  return (
    <div className="Header">
      <h1>ToDo</h1>
      <button>
        <img src={sunImg} alt="sun icon" />
      </button>
    </div>
  );
};

export default Header;
