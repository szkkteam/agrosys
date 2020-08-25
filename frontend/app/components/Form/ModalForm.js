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
    form,
    submitButtonProps,
    onClose,
}) => (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
            {title}
        </DialogTitle>
        <DialogContent>
            {form}
        </DialogContent>
        <DialogActions>
        <Button 
            onClick={onClose} 
            color="primary"
            variant="contained"
        >
            Cancel
        </Button>
        <SubmitButton 
            color="primary"
            variant="contained"
            {...submitButtonProps}
        >
            Save
        </SubmitButton>
        </DialogActions>
    </Dialog>
)
