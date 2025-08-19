import { useState } from "react";
import "./App.css";
import { supabase } from "./supabase-client";

function App() {

  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { data, error } = await supabase.from("tasks").insert(newTask);

    if(error){
      console.error("Error inserting task:", error.message);
    }
    console.log("Task inserted successfully:", data);
    setNewTask({ title: "", description: "" });
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      <h2>Task Manager CRUD</h2>

      {/* Form to add a new task */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Task Title"
          onChange={(e) => setNewTask((prev) => ({ ...prev, title: e.target.value }))}
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />
        <textarea
          placeholder="Task Description"
          onChange={(e) => setNewTask((prev) => ({ ...prev, description: e.target.value }))}
          style={{ width: "100%", marginBottom: "0.5rem", padding: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Add Task
        </button>
      </form>

      {/* List of Tasks */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li
          style={{
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "1rem",
            marginBottom: "0.5rem",
          }}
        >
          <div>
            <h3>Title</h3>
            <p>Description</p>
            <div>
              <button style={{ padding: "0.5rem 1rem", marginRight: "0.5rem" }}>
                Edit
              </button>
              <button style={{ padding: "0.5rem 1rem" }}>Delete</button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default App;