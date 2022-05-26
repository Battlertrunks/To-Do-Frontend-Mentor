import sunImg from "../todo-app-main/images/icon-sun.svg";
import moonImg from "../todo-app-main/images/icon-moon.svg";
import "./Header.css";

interface Props {
  setColor: string;
  changeColor: () => void;
}

const Header = ({ setColor, changeColor }: Props) => {
  return (
    <header className={`Header ${setColor}`}>
      <h1>ToDo</h1>
      <button onClick={() => changeColor()}>
        <img src={setColor ? moonImg : sunImg} alt="sun icon" />
      </button>
    </header>
  );
};

export default Header;
