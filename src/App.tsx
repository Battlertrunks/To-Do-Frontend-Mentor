import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import CreateToDoForm from "./components/CreateToDoForm";
import ToDoList from "./components/ToDoList";

function App() {
  return (
    <div className="App">
      <Header />
      <CreateToDoForm />
      <ToDoList />
    </div>
  );
}

export default App;
