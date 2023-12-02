import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface TaskFormProps {
    onSubmit: ({ id, title, description, priority, completed }: { id?: string, title: string, description: string, priority: string, completed?: boolean }) => void;
    task?: { id: string, title: string; description: string, priority: string, completed: boolean };
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, task }) => {
    const [title, setTitle] = useState(task ? task.title : '');
    const [description, setDescription] = useState(task ? task.description : '');
    const [priority, setPriority] = useState(task ? task.priority : '');
    const [completed, setCompleted] = useState(task ? task.completed : false)
    const handleChange = (e: SelectChangeEvent) => {
        setPriority(e.target.value);
    }
    const handleCompletedChange = (e: SelectChangeEvent) => {
        setCompleted(Boolean(e.target.value));
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({ id: task?.id, title, description, priority, completed });
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                disabled={completed}
            />
            <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                disabled={completed}
            />
            <FormControl fullWidth>
                <InputLabel id="task-priority">Priority</InputLabel>
                <Select
                    labelId="task-priority"
                    value={priority}
                    label="Priority"
                    onChange={handleChange}
                    disabled={completed}
                >
                    <MenuItem value={"HIGH"}>HIGH</MenuItem>
                    <MenuItem value={"MEDIUM"}>MEDIUM</MenuItem>
                    <MenuItem value={"LOW"}>LOW</MenuItem>
                </Select>
            </FormControl>
            {typeof completed !== 'undefined' && (<FormControl fullWidth>
                    <InputLabel id="task-status">Completed</InputLabel>
                    <Select
                        labelId="task-status"
                        label="Task Status"
                        onChange={handleCompletedChange}
                        disabled={completed}
                        value={completed?.toString()}
                    >
                        <MenuItem value={"true"}>Mark as done</MenuItem>
                    </Select>
                </FormControl>
            )}
            <Button sx={{ margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    );
}
export default TaskForm;