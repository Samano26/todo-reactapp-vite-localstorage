import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = React.memo(
  ({ tasks, deleteTask, toggleTaskCompletion }) => {
    return (
      <List sx={{ mt: 2 }}>
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteTask(task.id)}
              >
                <DeleteIcon />
              </IconButton>
            }
            sx={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#f9f9f9",
              borderRadius: 2,
              my: 1,
              maxWidth: 500,
              mx: "auto",
            }}
          >
            <Checkbox
              edge="start"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
              tabIndex={-1}
              disableRipple
            />
            <ListItemText
              primary={task.text}
              primaryTypographyProps={{
                sx: {
                  fontFamily: "monospace",
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "text.secondary" : "text.primary",
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    );
  }
);

export default TaskList;
