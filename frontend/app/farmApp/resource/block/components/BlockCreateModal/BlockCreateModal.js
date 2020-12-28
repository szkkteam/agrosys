import React, { useState  } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import { ROUTES } from 'routes'

import { withLinkComponent } from 'utils/hoc'

import { Modal } from 'site/components'

import {
    DialogTitle,
    DialogActions,
    DialogContent,
    IconButton,
    Typography,
    Grid,
    Button
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const LinkButton = withLinkComponent(Button)

import { getAvailableCreateOptions } from '../../selectors'
import { 
    BLOCK_CREATE_OPTION_ORDER,
    BLOCK_CREATE_OPTION_DRAW,
    BLOCK_CREATE_OPTION_UPLOAD_FILE,
    BLOCK_CREATE_OPTION_LPIS_MEPAR
} from '../../constants'

import './blockcreatemodal.scss'

const OptionSection = ({
    title,
    description,
    ...props
}) => {

    return (
        <Grid item xs={12}>
            <div className="option-button">
                <LinkButton
                    variant="contained"
                    color="primary"
                    {...props}
                >
                    <FormattedMessage {...title} />
                </LinkButton>
                <div className="description">
                    <Typography variant="body1">
                        <FormattedMessage {...description} />
                    </Typography> 
                </div>
            </div>
        </Grid>
    )
}


const BlockCreateModal = ({
    //options,
    headerProps,
    handleCancel,
    handleConfirm,
    ...props
}) => {
   
    const options = useSelector(getAvailableCreateOptions)

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
            <DialogContent className="dialog-content">
            <Grid 
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
                spacing={3}
            >
                { BLOCK_CREATE_OPTION_DRAW in options 
                     && <OptionSection 
                            title={messages.drawTitle}
                            description={messages.drawDesc}
                            to={ROUTES.BlockCreateDraw}
                            {...props}
                        /> }
                { BLOCK_CREATE_OPTION_UPLOAD_FILE in options 
                     && <OptionSection 
                            title={messages.uploadTitle}
                            description={messages.uploadDesc}
                            to={ROUTES.BlockCreateUpload}
                            {...props}
                        /> }
                { BLOCK_CREATE_OPTION_LPIS_MEPAR in options 
                     && <OptionSection
                            title={messages.lpisTitle}
                            description={messages.lpisDesc}
                            to={ROUTES.BlockCreateLPIS}
                            {...props}
                        /> }
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
