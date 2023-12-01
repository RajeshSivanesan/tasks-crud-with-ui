import { useState, useEffect } from 'react';
import { Chip } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';import { getTasks } from '../api';
;

interface onEditData {
    title: string;
    description: string;
    completed?: boolean;
}

const chipColor: {[key in string]: string} = {
    "HIGH": "error",
    "MEDIUM": "info",
    "LOW": "secondary"
}

// interface TaskListProps {
//     tasks: { id: number; title: string; description: string, priority: string, completed: boolean }[];
//     onDelete: (id: number) => void;
//     // onEdit: (id: number, data: onEditData) => void;
// }
const TaskList: React.FC = () => {
    const [rows, setRows] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [limit, _] = useState(1);
    const [skip, setSkip] = useState(0);
    const [loading, setLoading] = useState(false);

    const columns: GridColDef[] = [
        { field: '_id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Title', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        {
            field: 'priority',
            headerName: 'Priority',
            width: 90,
            renderCell: (params: GridRenderCellParams<any, String>) => (
                <Chip label={params.row.priority} color={chipColor[params.row.priority] as any} />
            ),
        },
        {
            field: 'completed',
            headerName: 'Status',
            sortable: false,
            width: 160,
            renderCell: (params: GridRenderCellParams<any, String>) => (
                <Chip label={params.row.priority} color={chipColor[params.row.priority] as any} />
            ),
        },
        {
            field: 'actions',
            headerName: "Actions",
            sortable: false,
            width: 160,
            renderCell: (params: GridRenderCellParams<any, String>) => (
                <>
                    <IconButton>
                        <Delete/>
                    </IconButton>
                    <IconButton onClick={() => {}}>
                        <Edit/>
                    </IconButton>
                </>
            )
        }
    ];

    useEffect(() => {
        async function getTasksByLimit() {
            setLoading(true);
            const tasks = await getTasks(limit, skip);
            setRows(tasks?.tasks);
            setTotalCount(tasks?.totalCount);
            setLoading(false);
        }
        getTasksByLimit();
    }, [skip]);

    const handlePageChange = (x: any) => {
        console.log(x);
        if (x.page >= 1) {
            setSkip((x.page) * limit);
        }
    }

    if (rows.length === 0) {
        return (<p>Empty Tasks</p>)
    }

    return (
        <div>
            <p>Task List</p>
            <div>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowCount={totalCount}
                    paginationMode='server'
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: limit },
                        },
                    }}
                    loading={loading}
                    onPaginationModelChange={handlePageChange}
                    pageSizeOptions={[5, 10]}
                />
            </div>
        </div>
    );
}

export default TaskList;