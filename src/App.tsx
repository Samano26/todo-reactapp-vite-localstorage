import React, { useReducer, useEffect, useState } from "react";
import { getData, saveData, deleteData } from "./localStorageUtils";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { Container, Typography, Box, Button } from "@mui/material";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface State {
  tasks: Task[];
}

type Action =
  | { type: "ADD_TASK"; task: Task }
  | { type: "DELETE_TASK"; taskId: string }
  | { type: "TOGGLE_TASK"; taskId: string }
  | { type: "SET_TASKS"; tasks: Task[] }
  | { type: "CLEAR_TASKS" };

const taskReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TASK":
      return { tasks: [...state.tasks, action.task] };
    case "DELETE_TASK":
      return { tasks: state.tasks.filter((task) => task.id !== action.taskId) };
    case "TOGGLE_TASK":
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.taskId
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    case "SET_TASKS":
      return { tasks: action.tasks };
    case "CLEAR_TASKS":
      return { tasks: [] };
    default:
      return state;
  }
};

const App: React.FC = () => {
  const [state, dispatch] = useReducer(taskReducer, { tasks: [] });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      const savedTasks = getData("tasks");
      if (savedTasks.length > 0) {
        dispatch({ type: "SET_TASKS", tasks: savedTasks });
      }
      setIsInitialized(true);
    }
  }, [isInitialized]);

  useEffect(() => {
    saveData("tasks", state.tasks);
  }, [state.tasks]);

  const addTask = (task: Task) => {
    dispatch({ type: "ADD_TASK", task });
  };

  const deleteTask = (taskId: string) => {
    dispatch({ type: "DELETE_TASK", taskId });
  };

  const toggleTaskCompletion = (taskId: string) => {
    dispatch({ type: "TOGGLE_TASK", taskId });
  };

  const clearAllTasks = () => {
    deleteData("tasks");
    dispatch({ type: "CLEAR_TASKS" });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h3" gutterBottom fontFamily="monospace">
          To-Do List
        </Typography>
        <TaskForm addTask={addTask} />
        {state.tasks.length > 0 ? (
          <>
            <TaskList
              tasks={state.tasks}
              deleteTask={deleteTask}
              toggleTaskCompletion={toggleTaskCompletion}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={clearAllTasks}
              sx={{ mt: 2 }}
            >
              Clear All Tasks
            </Button>
          </>
        ) : (
          <Typography
            variant="overline"
            gutterBottom
            fontFamily="monospace"
            sx={{ mt: 5 }}
          >
            There are no tasks yet
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default App;
