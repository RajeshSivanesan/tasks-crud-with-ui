import React, { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import { AddTaskButton } from '../components/AddTaskButton';
import { AddEditTaskDialog } from '../components/AddEditTaskDialog';
import { deleteTask, filterTasks, getTasks, postCreateTask, updateTask } from '../api';
import AlertDialog from '../components/common/AlertDialog';
import { GridFilterModel } from '@mui/x-data-grid';
import { debounce } from '../util';

const LIMIT = 10;

const Tasks: React.FC = () => {
    const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);
    const [selectedTask, setSelectedTask] = useState({});
    const [openConfirmDialog, setConfirmDialog] = useState(false);
    const [rows, setRows] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [invokeGetApi, setInvokeGetApi] = useState(false);

    const [skip, setSkip] = useState(0);
    const [loading, setLoading] = useState(false);
    const onEditTask = (task: any) => {
        setSelectedTask(task);
        setOpenAddTaskDialog(true);
    }
    const onAddTask = () => {
        setOpenAddTaskDialog(true);
    }

    const onDelete = (task: any) => {
        setSelectedTask(task);
        setConfirmDialog(true);
    }

    useEffect(() => {
        async function getTasksByLimit() {
            setLoading(true);
            const tasks = await getTasks(LIMIT, skip);
            setRows(tasks?.tasks);
            setTotalCount(tasks?.totalCount);
            setLoading(false);
            setInvokeGetApi(false);
        }
        getTasksByLimit();
    }, [skip, invokeGetApi]);

    const onDeleteYesConfirm = async () => {
        try {
            await deleteTask((selectedTask as any)?.id);
        } catch (ex) {
            console.log(ex);
        } finally {
            setConfirmDialog(false);
            setInvokeGetApi(true);
            setSelectedTask({});
        }
    }

    const onSubmit = async ({ id, title, description, priority, completed }: any) => {
        if (id) {
            // edit Mode
            try {
                await updateTask(id, {
                    title,
                    description,
                    priority,
                    completed
                });
            } catch (ex) {
                console.log(ex);
            } finally {
                setOpenAddTaskDialog(false);
                setInvokeGetApi(true);
            }
        } else {
            // create mode
            try {
                await postCreateTask({
                    title,
                    description,
                    priority,
                    completed: false
                });
            } catch (ex) {
                console.log(ex);
            } finally {
                setOpenAddTaskDialog(false);
                setInvokeGetApi(true);
            }
        }
    }

    const onFilterChange = async (filterModel: GridFilterModel) => {
        // Here you save the data you need from the filter model
        const { quickFilterValues = [], items } = filterModel;
        if (items.length) {
            const { field, value } = items[0];
            const priorityValue = field === 'priority' && value;
            const statusValue = field === 'completed' && value;
            const result = await filterTasks(statusValue, priorityValue, "");
            setRows(result?.tasks);
            setTotalCount(result?.totalCount);
        } else {
            // search
            const result = await filterTasks("", "", quickFilterValues[0]);
            setRows(result?.tasks);
            setTotalCount(result?.totalCount);
        }
      };

    return (
        <div className='tasksDiv'>
            <h2>Task Manager</h2>
            <TaskList
                onDelete={onDelete}
                onEdit={onEditTask}
                rows={rows}
                limit={LIMIT}
                skip={skip}
                onFilterChange={debounce(onFilterChange, 1000)}
                setSkip={setSkip}
                loading={loading}
                totalCount={totalCount}
            />
            <AddTaskButton onAdd={onAddTask} />
            {openAddTaskDialog && (
                <AddEditTaskDialog
                    open={openAddTaskDialog}
                    setOpen={() => setOpenAddTaskDialog(false)}
                    onSubmit={onSubmit}
                    task={selectedTask ?? {}}
                />
            )}
            {openConfirmDialog && (
                <AlertDialog
                    alertBody='Are you sure you want to delete?'
                    alertTitle='Confirm Deletion'
                    alertYesAction={onDeleteYesConfirm}
                    openAlert={openConfirmDialog}
                    closeAlert={() => setConfirmDialog(false)}
                />
            )}
        </div>
    );
}
export default Tasks;