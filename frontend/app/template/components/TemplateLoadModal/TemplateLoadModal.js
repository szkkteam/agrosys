import React from 'react'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
    SubmitButton,
} from 'components/Form'

export default ({
    open,
    title,
    onLoad,
    onClose,
    children,
}) => (
    <Dialog open={open} onClose={onClose} aria-labelledby="template-load-title">
        <DialogTitle id="template-load-title">
            {title}
        </DialogTitle>
        <DialogContent>
            {children}
        </DialogContent>
        <DialogActions>
        <Button 
            onClick={onClose} 
            color="primary"
            variant="contained"
        >
            Cancel
        </Button>
        <Button 
            color="primary"
            variant="contained"
            onLoad={onLoad}
        >
            Load
        </Button>
        </DialogActions>
    </Dialog>
)

