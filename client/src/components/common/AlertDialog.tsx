import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({ openAlert: open, closeAlert, alertBody, alertTitle, alertYesAction }: { openAlert: boolean, closeAlert: Function, alertBody: string, alertTitle: string, alertYesAction: Function }) {
    const handleClose = () => {
        closeAlert();
    };

    const handleYes = () => {
        alertYesAction?.();
    }

    return (
        <>
           <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {alertTitle}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {alertBody}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleYes}>Yes</Button>
                    <Button onClick={handleClose} autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}