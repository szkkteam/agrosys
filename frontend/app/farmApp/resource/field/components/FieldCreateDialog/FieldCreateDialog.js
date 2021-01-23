import React, { useState  } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import { ROUTES } from 'routes'

import { Modal, ModalHeader, ModalContent } from 'components'

import {
    Grid,
} from '@material-ui/core';

import FieldCreateOption from '../FieldCreateOption/FieldCreateOption'

const getDefaultOptions = () => [
    {title: messages.drawTitle, description: messages.drawDesc, to: ROUTES.ResourceFieldCreateDraw },
    {title: messages.uploadTitle, description: messages.uploadDesc, to: ROUTES.ResourceFieldCreateUpload },
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
        <Modal
            fullWidth
            maxWidth="sm"
            disableBackdropClick={true}
        >   
            <ModalHeader
                title={messages.title}
            />
            <PaddedContent>
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
            </PaddedContent>
        </Modal>
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
