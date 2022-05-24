import { useState } from "react";
import ToDo from "../models/toDo";
import CreateToDoForm from "./CreateToDoForm";
import "./ToDoList.css";

const ToDoList = () => {
  const [toDos, setToDos] = useState<ToDo[]>([
    { toDoSentence: "Walk the dog", completed: false },
    { toDoSentence: "Clean the house", completed: true },
  ]);

  const recreateArray = (index: number) => {
    const newArr = [...toDos];
    newArr[index].completed = !newArr[index].completed;

    setToDos(newArr);
  };

  return (
    <section className="ToDoList">
      <CreateToDoForm />
      <ul>
        {toDos.map((toDo, i) => (
          <li key={i}>
            <button onClick={() => recreateArray(i)}>
              {toDo.completed ? "Completed" : "Complete"}
            </button>
            <p>{toDo.toDoSentence}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ToDoList;
