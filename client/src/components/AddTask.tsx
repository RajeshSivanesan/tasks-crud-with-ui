import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { SxProps } from '@mui/system';

const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
};

const fab = {
    color: 'primary' as 'primary',
    sx: fabStyle as SxProps,
    icon: <AddIcon />,
    label: 'Add',
}

export const AddTask: React.FC<{onAdd: Function}> = ({ onAdd }) => {
    return (
        <Fab onClick={() => onAdd()} sx={fab.sx} aria-label={fab.label} color={fab.color}>
            {fab.icon}
        </Fab>
    )
}