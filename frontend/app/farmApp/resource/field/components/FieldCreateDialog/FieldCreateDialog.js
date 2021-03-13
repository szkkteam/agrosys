import React, { useState  } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import { ROUTES } from 'farmApp/routes'

import { Modal, ModalHeader, ModalContent } from 'components'
import { 
    Dialog,
    Button,
} from 'components'

import {
    Grid,
} from '@material-ui/core';

import FieldCreateOption from '../FieldCreateOption/FieldCreateOption'

const getDefaultOptions = () => [
    {title: messages.drawTitle, description: messages.drawDesc, to: ROUTES.ResourceFieldCreateDraw },
    {title: messages.uploadTitle, description: messages.uploadDesc, to: ROUTES.ResourceField },
]

const PaddedContent = styled(ModalContent)`
    padding: 20px 15px;
`

const FieldCreateDialog = ({
    options=getDefaultOptions(),
    //options,
    headerProps,
    handleCancel,
    handleConfirm,
    ...props
}) => {

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            disableBackdropClick={true}
        >   
            <Dialog.SimpleHeader
                title={messages.title}                
            >
                <Dialog.CloseButton />
            </Dialog.SimpleHeader>
            <Dialog.Content
                py={3}
                //dividers
            >
                <Grid 
                    container
                    direction="column"
                    justify="center"
                    alignItems="flex-start"
                    spacing={3}
                >
                    {options && options.map((optionProps) => (
                        <FieldCreateOption key={optionProps.to} {...optionProps} />
                    ))
                    }
                </Grid> 
            </Dialog.Content>
            
        </Dialog>
    )
    
}


FieldCreateDialog.propTypes = {
    title: PropTypes.object.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.object.isRequired,
        to: PropTypes.string.isRequired,
        description: PropTypes.object.isRequired
    }))
}

export default FieldCreateDialog
