import { FormEvent, useState } from "react";
import ToDo from "../models/toDo";
import "./CreateToDoForm.css";

interface Props {
  addTask: (task: ToDo) => void;
}

const CreateToDoForm = ({ addTask }: Props) => {
  const [completed, setCompleted] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>("");

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    addTask({ completed, toDoSentence: taskName });
  };

  return (
    <form className="CreateToDoForm" onSubmit={submitHandler}>
      <input
        type="checkbox"
        name="check-activity"
        id="check-activity"
        value={""}
        onChange={(e) => setCompleted(e.target.checked)}
      />
      <input
        type="text"
        name="task-name"
        id="task-name"
        placeholder="Create a new todo..."
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
    </form>
  );
};

export default CreateToDoForm;
