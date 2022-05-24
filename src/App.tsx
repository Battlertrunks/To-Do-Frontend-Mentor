import React from "react";
import "./App.css";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";

function App() {
  return (
    <main className="App">
      <Header />
      <ToDoList />
    </main>
  );
}

export default App;
