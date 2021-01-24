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

import { LeafletMap } from 'farmApp/map/components'

import './farmpickonmap.scss'

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
    // TODO: Send a request to the backend to fetch the location data
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = () => {
        console.log("handleSubmit")
        setIsLoading(true)
        sleep(1000).then(() => {
            const payload = {id: 1, data: "Country, City, 9999, Address 1"}
            setIsLoading(false)
            handleConfirm(payload)
        })        
    }

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
                <div className="pos-rel">
                    <LeafletMap
                        className="map-container"
                    />
                    { isLoading &&
                        <div className="overlay-container"
                            //style={{position: "absolute", top: "0px", left: "0px", width: "100%", backgroundColor: "black", opacity: 0.6, zIndex: 1000}}
                        >
                            <CircularProgress
                                //style={{position: "absolute", top: "50%", left: "50%"}}
                                color="primary"
                            />
                        </div> 
                    }
                </div>
            </DialogContent>
            <DialogActions>
                <SubmitButton
                    cancelTitle={ButtonMessages.cancel}
                    submitTitle={ButtonMessages.submit}
                    submitDisabled={false}
                    onCancel={handleCancel}
                    onSubmit={handleSubmit}
                />                      
            </DialogActions>
        </Modal>
    )
}