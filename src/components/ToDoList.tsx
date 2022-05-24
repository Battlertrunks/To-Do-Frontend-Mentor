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
      <ul className="list-item">
        {toDos
          .filter((toDo) => filterList(toDo))
          .map((toDo, i) => (
            <li className="task-item" key={i}>
              <div className="comp-btn-and-sentence">
                <div className="container-list">
                  <span
                    className={
                      toDo.completed ? "checkmark-list comp" : "checkmark-list"
                    }
                  ></span>
                  <button
                    className="checkbox-list"
                    onClick={() => recreateArray(i)}
                  ></button>
                </div>
                <p className={toDo.completed ? "crossed-off" : ""}>
                  {toDo.toDoSentence}
                </p>
              </div>
              <button
                className="delete-task-btn"
                onClick={() => deleteTask(i)}
              ></button>
            </li>
          ))}
      </ul>
      <ul className="manipulate-list-container">
        <li>
          <p>{toDos.filter((toDo) => !toDo.completed).length} items left</p>
        </li>
        <li className="filter-btns-desktop">
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
      <ul className="filter-btns-mobile">
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
      <p className="drag-drop-instructions">Drag and drop to reorder list</p>
    </section>
  );
};

export default ToDoList;
