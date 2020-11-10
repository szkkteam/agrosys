import React, { useState  } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import { ROUTES } from 'routes'
import { ROUTE_MAP } from 'routes'
import { useHistory } from "react-router-dom";

import { Modal } from 'site/components'
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';

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
    url,
    handleClose
}) => {

    let history = useHistory()

    const handleNavigate = () => {
        const path = ROUTE_MAP[url]
        history.push(path.toPath())
        //handleClose()
    }

    return (
        <Grid item xs={12}>
            <div className="option-button">
                <Button 
                    onClick={handleNavigate}
                    variant="contained"
                    color="primary"
                >
                    <FormattedMessage {...title} />
                </Button>
                <div className="description">
                    <Typography variant="body1">
                        <FormattedMessage {...description} />
                    </Typography> 
                </div>
            </div>
        </Grid>
    )
}

const DrawButton = props => <OptionSection
                                title={messages.drawTitle}
                                description={messages.drawDesc}
                                url={ROUTES.BlockCreateDraw}
                                {...props}
                            />
const UploadButton = props => <OptionSection
                                title={messages.uploadTitle}
                                description={messages.uploadDesc}
                                url={ROUTES.BlockCreateUpload}
                                {...props}
                            />
const LpisMeparButton = props => <OptionSection 
                                title={messages.lpisTitle}
                                description={messages.lpisDesc}
                                url={ROUTES.BlockCreateLPIS}
                                {...props}
                            />

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
                { BLOCK_CREATE_OPTION_DRAW in options &&
                    <DrawButton handleClose={handleConfirm}/> }
                { BLOCK_CREATE_OPTION_UPLOAD_FILE in options &&
                    <UploadButton handleClose={handleConfirm}/> }
                { BLOCK_CREATE_OPTION_LPIS_MEPAR in options &&
                    <LpisMeparButton handleClose={handleConfirm}/> }
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
