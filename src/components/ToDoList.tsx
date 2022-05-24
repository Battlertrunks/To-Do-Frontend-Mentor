import { useState } from "react";
import ToDo from "../models/toDo";
import CreateToDoForm from "./CreateToDoForm";
import "./ToDoList.css";

const ToDoList = () => {
  const [toDos, setToDos] = useState<ToDo[]>([
    { toDoSentence: "Walk the dog", completed: false },
    { toDoSentence: "Clean the house", completed: true },
  ]);

  const [filter, setFilter] = useState<boolean | null>(null);

  const recreateArray = (index: number): void => {
    const newArr: ToDo[] = [...toDos];
    newArr[index].completed = !newArr[index].completed;

    setToDos(newArr);
  };

  const deleteTask = (index: number): void => {
    const newArr: ToDo[] = [
      ...toDos.slice(0, index),
      ...toDos.slice(index + 1),
    ];

    setToDos(newArr);
  };

  const addNewTask = (task: ToDo): void => {
    setToDos([task, ...toDos]);
  };

  const filterList = (toDo: ToDo): boolean => {
    if (filter === null) return true;
    else if (filter === toDo.completed && filter) return true;
    else if (filter === toDo.completed && !filter) return true;
    return false;
  };

  const clearCompleted = (): void => {
    setToDos([...toDos.filter((toDo) => !toDo.completed)]);
  };

  return (
    <section className="ToDoList">
      <CreateToDoForm addTask={addNewTask} />
      <ul>
        {toDos
          .filter((toDo) => filterList(toDo))
          .map((toDo, i) => (
            <li key={i}>
              <button onClick={() => recreateArray(i)}>
                {toDo.completed ? "Completed" : "Complete"}
              </button>
              <p>{toDo.toDoSentence}</p>
              <button onClick={() => deleteTask(i)}>X</button>
            </li>
          ))}
      </ul>
      <ul>
        <li>
          <p>{toDos.filter((toDo) => !toDo.completed).length} items left</p>
        </li>
        <li>
          <ul>
            <li>
              <button onClick={() => setFilter(null)}>All</button>
            </li>
            <li>
              <button onClick={() => setFilter(false)}>Active</button>
            </li>
            <li>
              <button onClick={() => setFilter(true)}>Completed</button>
            </li>
          </ul>
        </li>
        <li>
          <button onClick={() => clearCompleted()}>Clear Completed</button>
        </li>
      </ul>
    </section>
  );
};

export default ToDoList;
