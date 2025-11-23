import React, { useState, useCallback } from "react";
import { TextField, Button, Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface TaskFormProps {
  addTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [taskText, setTaskText] = useState<string>("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!taskText.trim()) return;

      const newTask: Task = {
        id: uuidv4(),
        text: taskText,
        completed: false,
      };

      addTask(newTask);
      setTaskText("");
    },
    [taskText, addTask]
  );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 1, justifyContent: "center", mt: 2 }}
    >
      <TextField
        variant="outlined"
        label="New Task"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        fullWidth
        sx={{ maxWidth: "300px", fontFamily: "monospace" }}
      />
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </Box>
  );
};

export default TaskForm;
