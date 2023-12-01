import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { IconButton, Typography, Chip, Stack, Button } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

interface TaskProps {
    id: number;
    title: string;
    description: string;
    priority: string;
    completed: boolean;
    onDelete: (id: number) => void;
    // onEdit: (id: number, data: any) => void;
}

const chipColor: {[key in string]: string} = {
    "HIGH": "error",
    "MEDIUM": "info",
    "LOW": "secondary"
}

const Task: React.FC<TaskProps> = ({ id, title, description, priority, onDelete }) => {
    return (
        <Card sx={{ marginBottom: "10px" }}>
            <CardContent>
                <Typography variant="h6" color="text.secondary">
                    {title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {description}
                </Typography>
                <Stack justifyContent="center" alignItems="center" direction="row" gap="10px">
                    <span>Priority</span>
                    <Chip label={priority} color={chipColor[priority] as any} />
                </Stack>
            </CardContent>
            <CardActions>
                <IconButton onClick={() => onDelete(id)}>
                    <Delete/>
                </IconButton>
                <IconButton onClick={() => {}}>
                    <Edit/>
                </IconButton>
                <Button onClick={() => {}}>
                    Mark as done
                </Button>
            </CardActions>
        </Card>
    );
}

export default Task;