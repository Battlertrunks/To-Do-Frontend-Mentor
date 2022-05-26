import { FormEvent, useState } from "react";
import ToDo from "../models/toDo";
import "./CreateToDoForm.css";

interface Props {
  addTask: (task: ToDo) => void;
  setId: number;
  addId: () => void;
  setColor: string;
}

const CreateToDoForm = ({ addTask, setId, addId, setColor }: Props) => {
  const [completed, setCompleted] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>("");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    addTask({
      completed,
      toDoSentence: taskName,
      visible: true,
      id: setId.toString(),
    });
    addId();
    setTaskName("");
  };

  return (
    <form className={`CreateToDoForm ${setColor}`} onSubmit={submitHandler}>
      <label className="container">
        <input
          className="checkbox"
          type="checkbox"
          name="check-activity"
          id="check-activity"
          value={""}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        <span className="checkmark"></span>
      </label>
      <input
        type="text"
        name="task-name"
        id="task-name"
        placeholder="Create a new todo..."
        autoComplete="off"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
    </form>
  );
};

export default CreateToDoForm;
