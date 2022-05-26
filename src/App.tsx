import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";

function App() {
  const [lightMode, setLightMode] = useState<boolean>(false);

  const changeColorMode = (): void => {
    setLightMode((prev) => !prev);
  };

  const color: string = lightMode ? "light-mode" : "";

  return (
    <main className="App">
      <Header setColor={color} changeColor={changeColorMode} />
      <ToDoList setColor={color} />
    </main>
  );
}

export default App;
