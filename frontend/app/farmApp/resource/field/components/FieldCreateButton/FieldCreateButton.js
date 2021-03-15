import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom'

import { FIELD_CREATE_DIALOG } from 'site/modalTypes'
import { usePushModalWindow } from 'utils/hooks'

import { PrimaryActionButton } from 'components'

const FieldCreateButton = forwardRef(({
    customRef,
    onClick,
    pushModalWindow,
    ...props
}, ref) => {
    console.debug("FieldCreateButton ref: ", ref)
    const params = useParams()

    
    const push = usePushModalWindow()


    const openFieldCreation = () => {
        push(FIELD_CREATE_DIALOG, {}).then(({status}) => {
            /*
            if (status === MODAL_TYPE_CONFIRM) {
            }
            */
        })
    }
    

    return (
        <PrimaryActionButton
            title={messages.title}
            onClick={openFieldCreation}
            {...props}
        />
    )
})

FieldCreateButton.propTypes = {
    
}

export default FieldCreateButton
