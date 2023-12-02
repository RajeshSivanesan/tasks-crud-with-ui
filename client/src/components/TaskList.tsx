import { useState, useEffect, useCallback } from 'react';
import { Box, Chip } from '@mui/material';
import { DataGrid, GridColDef, GridFeatureMode, GridFilterModel, GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { filterTasks, getTasks } from '../api';

interface onEditData {
    title: string;
    description: string;
    completed?: boolean;
}

const chipColor: { [key in string]: string } = {
    "HIGH": "error",
    "MEDIUM": "info",
    "LOW": "secondary"
}

const taskStatus: { [key in string]: string } = {
    "false": "warning",
    "true": "success"
}

// interface TaskListProps {
//     tasks: { id: number; title: string; description: string, priority: string, completed: boolean }[];
//     onDelete: (id: number) => void;
//     // onEdit: (id: number, data: onEditData) => void;
// }
const TaskList: React.FC<{ loading: any, onFilterChange: Function, limit: any, totalCount: any, skip: any, setSkip: any, rows: any, onEdit: any, onDelete: any }> = ({ loading, skip, onFilterChange, setSkip, totalCount, limit, rows, onEdit, onDelete }: any) => {
    const columns: GridColDef[] = [
        {
            field: '_id', headerName: 'ID', minWidth: 220, headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            disableColumnMenu: true,
            align: 'center'
        },
        {
            field: 'title', headerName: 'Title', minWidth: 220, headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            disableColumnMenu: true,
            align: 'center'
        },
        {
            field: 'description', headerName: 'Description', minWidth: 220, headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            disableColumnMenu: true,
            align: 'center'
        },
        {
            field: 'priority',
            headerName: 'Priority',
            disableColumnMenu: true,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            renderCell: (params: GridRenderCellParams<any, String>) => (
                <Chip label={params.row.priority} color={chipColor[params.row.priority] as any} />
            ),
            minWidth: 200,
            resizable: false,
            align: 'center'
        },
        {
            field: 'completed',
            headerName: 'Status',
            disableColumnMenu: true,
            sortable: false,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            renderCell: (params: GridRenderCellParams<any, String>) => (
                <Chip label={params.row.completed ? "Done" : "In progress"} color={taskStatus[params.row.completed?.toString()] as any} />
            ),
            minWidth: 200,
            resizable: false,
            align: 'center'
        },
        {
            field: 'actions',
            headerName: "Actions",
            sortable: false,
            disableColumnMenu: true,
            headerClassName: 'super-app-theme--header',
            headerAlign: 'center',
            renderCell: (params: GridRenderCellParams<any, String>) => (
                <>
                    <IconButton onClick={() => onDelete(params.row)}>
                        <Delete />
                    </IconButton>
                    <IconButton onClick={() => onEdit(params.row)}>
                        <Edit />
                    </IconButton>
                </>
            ),
            resizable: false,
            minWidth: 154,
            align: 'center'
        }
    ];
    const [filterMode, setFilterMode] = useState<GridFeatureMode>('server');

    const handlePageChange = (x: any) => {
        setSkip((x.page) * limit);
    }

    const handleFilterChange = (filterModel: GridFilterModel) => {
        const { items } = filterModel;
        if (items.length > 0) {
            const { field } = items[0];
            if (!['completed', 'priority'].includes(field)) {
                setFilterMode('client');
            } else {
                setFilterMode('server');
                onFilterChange(filterModel);
            }
        } else {
            setFilterMode('server');
            onFilterChange(filterModel);
        }
    }

    if (rows.length === 0) {
        return (<p>Empty Tasks</p>)
    }

    return (
        <div>
            <Box sx={{ 
                width: "100%",
                '& .super-app-theme--header': {
                    fontWeight: 'bolder',
                    textTransform: 'uppercase'
                },
            }}>
                <DataGrid
                    slots={{ toolbar: GridToolbar }}
                    rows={rows}
                    disableColumnSelector
                    disableDensitySelector
                    disableRowSelectionOnClick
                    columns={columns}
                    rowCount={totalCount}
                    density='standard'
                    filterMode={filterMode}
                    onFilterModelChange={handleFilterChange}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true,
                        },
                    }}
                    paginationMode='server'
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: limit, page: 0 },
                        }
                    }}
                    loading={loading}
                    onPaginationModelChange={handlePageChange}
                    pageSizeOptions={[10]}
                />
            </Box>
        </div>
    );
}

export default TaskList;