import React, { useState  } from 'react'
import messages from './messages';
import { FormattedMessage } from 'react-intl';

import { Modal } from 'site/components'
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

import Button from '@material-ui/core/Button';
import { SubmitButton, messages as ButtonMessages } from 'components/Button'

/*
<Backdrop open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
*/

export default ({
    headerProps,
    handleCancel,
    handleConfirm,
    ...props
}) => {
   

    return (
        <Modal
            fullWidth
            maxWidth="sm"
            {...headerProps}
        >   
            <DialogTitle id="max-width-dialog-title">
                <FormattedMessage {...messages.title} />
            </DialogTitle>
            <DialogContent>
                Content
            </DialogContent>
            <DialogActions>
                                   
            </DialogActions>
        </Modal>
    )
}