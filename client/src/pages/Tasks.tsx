import React, { useState } from 'react';
import TaskList from '../components/TaskList';
import { AddTask } from '../components/AddTask';
import { AddEditTaskDialog } from '../components/AddEditTaskDialog';

const Tasks: React.FC = () => {
    const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);
    const onAddTask = () => {
        setOpenAddTaskDialog(true);
    }

    const onSubmit = (title: string, description: string, priority: string) => {

    }

    return (
        <>
            <TaskList />
            <AddTask onAdd={onAddTask} />
            {openAddTaskDialog && (
                <AddEditTaskDialog  
                    open={openAddTaskDialog}
                    setOpen={() => setOpenAddTaskDialog(false)}
                    onSubmit={onSubmit}
                />
            )}
        </>
    );
}
export default Tasks;