import React, { useState  } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import { ROUTES } from 'routes'

import { Modal } from 'site/components'
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';

import { getAvailableOptions } from '../../selectors'

import './blockcreatemodal.scss'

/*
<Backdrop open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
*/

const OptionSection = ({
    title,
    description,
}) => {
    return (
        <>
            <Button 
                variant="contained"
                color="primary"
            >
                <FormattedMessage {...title} />
            </Button>
            <Typography variant="h6">
                <FormattedMessage {...description} />
            </Typography> 
        </>
    )
}

const BlockCreateModal = ({
    //options,
    headerProps,
    handleCancel,
    handleConfirm,
    ...props
}) => {
   
    const optionData = {
        BLOCK_CREATE_OPTION_DRAW: {
            title: messages.drawTitle,
            description: messages.drawDesc,
            url: ROUTES.FarmCreate,
        },
        BLOCK_CREATE_OPTION_UPLOAD_FILE: {
            title: messages.drawTitle,
            description: messages.drawDesc,
            url: ROUTES.FarmCreate,
        },
        BLOCK_CREATE_OPTION_LPIS_MEPAR: {
            title: messages.drawTitle,
            description: messages.drawDesc,
            url: ROUTES.FarmCreate,
        }
    }

    const options = getAvailableOptions()
    
    return (
        <Modal
            fullWidth
            maxWidth="sm"
            disableBackdropClick={true}
            {...headerProps}
        >   
            <DialogTitle disableTypography id="max-width-dialog-title">
                <Typography variant="h6">
                    <FormattedMessage {...messages.title} />
                </Typography>                
                <IconButton aria-label="close" className="close-btn" onClick={handleCancel}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
            <Grid 
                container
                spacing={3}
            >
                { options && options.map((option, i) => (
                    <Grid item xs={12}>
                        <OptionSection 
                            {...optionData[option]}
                        />
                    </Grid>

                )) }                
            </Grid>
            </DialogContent>
            <DialogActions> 
                                   
            </DialogActions>
        </Modal>
    )
}

BlockCreateModal.propTypes = {
    //options: PropTypes.object.isRequired,
}

export default BlockCreateModal
