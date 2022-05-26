import { useState } from "react";
import ToDo from "../models/toDo";
import CreateToDoForm from "./CreateToDoForm";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./ToDoList.css";

interface Props {
  setColor: string;
}

const ToDoList = ({ setColor }: Props) => {
  const [toDos, setToDos] = useState<ToDo[]>([
    { toDoSentence: "Walk the dog", completed: false, visible: true, id: "0" },
    {
      toDoSentence: "Clean the house",
      completed: true,
      visible: true,
      id: "1",
    },
  ]);

  const [idToInsert, setIdToInsert] = useState<number>(2);

  const [filterBtnClass, setFilterBtnClass] = useState<boolean | null>(null);

  const addId = (): void => setIdToInsert((prev) => prev + 1);

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

  const filterList = (setVisible: boolean | null): void => {
    if (setVisible === null) {
      setFilterBtnClass(setVisible);
      const newArr = [...toDos];
      newArr.forEach((task) => (task.visible = true));
      setToDos(newArr);
    } else if (setVisible) {
      setFilterBtnClass(true);
      const newArr = [...toDos];
      newArr.forEach((task) => {
        if (task.completed) task.visible = true;
        else task.visible = false;
      });
      setToDos(newArr);
    } else if (!setVisible) {
      setFilterBtnClass(false);
      const newArr = [...toDos];
      newArr.forEach((task) => {
        if (!task.completed) task.visible = true;
        else task.visible = false;
      });
      setToDos(newArr);
    }
  };

  const clearCompleted = (): void => {
    setToDos([...toDos.filter((toDo) => !toDo.completed)]);
  };

  const handleOnDragEnd = (result: any): ToDo | void => {
    if (!result.destination) return;

    const tasks = Array.from(toDos);
    const [reorderedTask] = tasks.splice(result.source.index, 1);
    tasks.splice(result.destination.index, 0, reorderedTask);

    setToDos(tasks);
  };

  return (
    <section className="ToDoList">
      <CreateToDoForm
        addId={addId}
        setId={idToInsert}
        addTask={addNewTask}
        setColor={setColor}
      />
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="tasks">
          {(provide) => {
            return (
              <ul
                className="list-item"
                {...provide.droppableProps}
                ref={provide.innerRef}
              >
                {toDos.map((toDo, i) => (
                  <Draggable draggableId={toDo.id!} index={i} key={toDo.id}>
                    {(provided) => {
                      return (
                        <li
                          className={`task-item ${setColor} ${
                            !toDo.visible ? "show-task" : ""
                          }`}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <div className="comp-btn-and-sentence">
                            <div
                              className={
                                toDo.completed
                                  ? "container-list comp"
                                  : "container-list"
                              }
                            >
                              <button
                                className="checkbox-list"
                                onClick={() => recreateArray(i)}
                              ></button>
                              <span
                                className={
                                  toDo.completed
                                    ? "checkmark-list comp"
                                    : "checkmark-list"
                                }
                              ></span>
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
                      );
                    }}
                  </Draggable>
                ))}
                {provide.placeholder}
              </ul>
            );
          }}
        </Droppable>
      </DragDropContext>
      <ul className={`manipulate-list-container ${setColor}`}>
        <li>
          <p>{toDos.filter((toDo) => !toDo.completed).length} items left</p>
        </li>
        <li className="filter-btns-desktop">
          <ul>
            <li>
              <button onClick={() => filterList(null)}>All</button>
            </li>
            <li>
              <button onClick={() => filterList(false)}>Active</button>
            </li>
            <li>
              <button onClick={() => filterList(true)}>Completed</button>
            </li>
          </ul>
        </li>
        <li>
          <button onClick={() => clearCompleted()}>Clear Completed</button>
        </li>
      </ul>
      <ul className={`filter-btns-mobile ${setColor}`}>
        <li>
          <button
            className={filterBtnClass === null ? "selected-filter" : ""}
            onClick={() => filterList(null)}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={filterBtnClass === false ? "selected-filter" : ""}
            onClick={() => filterList(false)}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={filterBtnClass ? "selected-filter" : ""}
            onClick={() => filterList(true)}
          >
            Completed
          </button>
        </li>
      </ul>
      <p className={`drag-drop-instructions ${setColor}`}>
        Drag and drop to reorder list
      </p>
    </section>
  );
};

export default ToDoList;
