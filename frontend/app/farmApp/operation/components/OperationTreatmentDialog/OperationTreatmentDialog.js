import React, { useRef, useMemo, useLayoutEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import globalMessages from 'messages'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import ModalContext from 'components/Dialog/Context'

import { 
    DialogCloseLayout,
} from 'farmApp/components'

import {
    Button
} from '@material-ui/core'

const OperationTreatmentDialog = ({
    headerProps,
    data,
    ...props
}) => {

    const { handleConfirm } = useContext(ModalContext)

    const handleSubmit = (d) => {
        console.debug("Submitting ... : ", d)
        handleConfirm && handleConfirm(d)
    }
    // 
    return (
        <DialogCloseLayout>
            <DialogCloseLayout.Content
                title={messages.title}
                subheader={messages.title}
                primaryButtonProps={{
                    color: "primary",
                    title: globalMessages.save
                }}
            >
                <div>content</div>
            </DialogCloseLayout.Content>
        </DialogCloseLayout>        
    )
}

OperationTreatmentDialog.propTypes = {

}

export default OperationTreatmentDialog