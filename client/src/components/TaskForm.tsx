import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface TaskFormProps {
    onSubmit: (title: string, description: string, priority: string) => void;
    task?: { title: string; description: string, priority: string };
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, task }) => {
    const [title, setTitle] = useState(task ? task.title : '');
    const [description, setDescription] = useState(task ? task.description : '');
    const [priority, setPriority] = useState(task ? task.priority : '');
    const handleChange = (e: SelectChangeEvent) => {
        setPriority(e.target.value);
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(title, description, priority);
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
            />
            <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
            />
            <FormControl fullWidth>
                <InputLabel id="task-priority">Priority</InputLabel>
                <Select
                    labelId="task-priority"
                    value={priority}
                    label="Priority"
                    onChange={handleChange}
                >
                    <MenuItem value={"HIGH"}>HIGH</MenuItem>
                    <MenuItem value={"MEDIUM"}>MEDIUM</MenuItem>
                    <MenuItem value={"LOW"}>LOW</MenuItem>
                </Select>
            </FormControl>
            <Button sx={{ margin: '0 auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }} type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    );
}
export default TaskForm;