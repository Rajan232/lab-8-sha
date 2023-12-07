import { useState } from "react";

function Task(props) {
  console.log(props);

  function onChange() {
    // Find the task we want to update and update it
    // Find the task we want to update and update it
    const updatedTask = {
      id: props.id,
      description: props.description,
      completed: !props.completed,
    };
    fetch(`http://localhost/api/tasks/${props.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => response.json())
      .then(() => {
        props.setTasks((tasks) =>
          tasks.map((task) => {
            if (task.id === props.id) {
              return updatedTask;
            } else {
              return task;
            }
          })
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function onClick() {
    // Find the task we want to delete and remove it
    fetch(`http://localhost/api/tasks/${props.id}`, {
      method: "DELETE",
    })
      .then(() => {
        props.setTasks((tasks) => tasks.filter((task) => task.id !== props.id));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

 /* function sendData(id){
	let element = document.getElementsByName(`extra-${id}`)[0];
    let desc = element.value
	fetch(`http://localhost/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ extradescription: desc, completed: true }),
    })
      .catch((error) => {
        console.error("Error:", error);
      });


  }*/

  const [isOpen, setIsOpen] = useState(false);

  return (
	< >
    <li className="listtask">
      <button type="button" onClick={onClick}>
        X
      </button>
      <span className="desc" onClick={() => setIsOpen(true)}>
        {" "}
        {props.description}{" "}
      </span>
      <input type="checkbox" checked={props.completed} onChange={onChange} />
      
    </li>

{isOpen && (
	<div>
	  <textarea
		type="text"
		style={{ display: isOpen ? "block" : "none" }}
		placeholder="Additional content" name={`extra-${props.id}`}
	  >
		{props.extradescription}
	  </textarea>
	  <button type="button" >Submit</button>
	</div>
  )}
  </>
  );
}

function List(props) {
  const [newTask, setNewTask] = useState("");

  function onChange(event) {
    setNewTask(event.target.value);
  }

  function onClick() {
    fetch("http://localhost/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: newTask, completed: false }),
    })
      .then((response) => response.json())
      .then((data) => {
        props.setTasks((tasks) => [...tasks, data]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setNewTask(""); // Clear the input field
  }

  return (
    <div>
      <h1>{props.heading}</h1>
      <input type="text" placeholder="Add a new task" onChange={onChange} />
      <button type="button" onClick={onClick}>
        Add
      </button>
      <ul>
        {props.tasks.map((task) => (
          <Task
            setTasks={props.setTasks}
            id={task.id}
            description={task.description}
            completed={task.completed}
          />
        ))}
      </ul>
    </div>
  );
}

export default List;
