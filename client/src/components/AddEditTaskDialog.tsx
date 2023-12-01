import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import TaskForm from './TaskForm';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const AddEditTaskDialog = ({ open, setOpen, task, onSubmit }: { open: boolean, setOpen: Function, task?: any, onSubmit: (title: string, description: string, priority: string) => void }) => {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setOpen(false)}
        >
            <DialogTitle>Add Task</DialogTitle>
            <DialogContent>
                <TaskForm task={task} onSubmit={onSubmit} />
            </DialogContent>
        </Dialog>
    )
}