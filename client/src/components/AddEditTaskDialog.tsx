import React from 'react';
import { Dialog, DialogContent, DialogTitle, Slide } from '@mui/material';
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

export const AddEditTaskDialog = ({ open, setOpen, task, onSubmit }: { open: boolean, setOpen: Function, task?: any, onSubmit: ({ id, title, description, priority, completed }: { id?: string, title: string, description: string, priority: string, completed?: boolean }) => void }) => {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setOpen(false)}
        >
            <DialogTitle>{`${Object.keys(task).length ? 'Edit': 'Add'} Task`}</DialogTitle>
            <DialogContent>
                <TaskForm task={task} onSubmit={onSubmit} />
            </DialogContent>
        </Dialog>
    )
}