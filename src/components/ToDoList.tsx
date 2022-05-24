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
    const newArr: ToDo[] = [...toDos];
    newArr[index].completed = !newArr[index].completed;

    setToDos(newArr);
  };

  const deleteTask = (index: number) => {
    const newArr: ToDo[] = [
      ...toDos.slice(0, index),
      ...toDos.slice(index + 1),
    ];

    setToDos(newArr);
  };

  const addNewTask = (task: ToDo) => {
    setToDos([task, ...toDos]);
  };

  return (
    <section className="ToDoList">
      <CreateToDoForm addTask={addNewTask} />
      <ul>
        {toDos.map((toDo, i) => (
          <li key={i}>
            <button onClick={() => recreateArray(i)}>
              {toDo.completed ? "Completed" : "Complete"}
            </button>
            <p>{toDo.toDoSentence}</p>
            <button onClick={() => deleteTask(i)}>X</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ToDoList;
