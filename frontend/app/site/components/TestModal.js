import React from 'react'

import { Modal } from 'site/components'
import DialogTitle from '@material-ui/core/DialogTitle';

export default ({
    headerProps,
    ...props
}) => {

    return (
        <Modal
            maxWidth="sm"
            {...headerProps}
        >
            <DialogTitle id="max-width-dialog-title">Optional sizes</DialogTitle>
            <div>
                Content
            </div>
        </Modal>
    )
}