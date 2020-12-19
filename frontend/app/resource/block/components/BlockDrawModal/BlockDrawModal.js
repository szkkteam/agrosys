import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { messages as ButtonMessages } from 'components/Button'
import { BlockFormStepButton } from '../../components'

import { Modal } from 'site/components'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {
    DialogTitle,
    DialogActions,
    DialogContent,
    Typography,
    IconButton
} from '@material-ui/core';

import { LeafletMap } from 'components/Map/components'

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`

const FullPageMap = styled(LeafletMap)`
    height: 100%;
`

const Header = styled(DialogTitle)`
    ${({ theme }) => `
        padding: 16px 0;
        //margin: 0 24px;
        background-color: ${theme.palette.primary.main};
        display: flex;
        align-items: center;
    `}    
`

const Content = styled(DialogContent)`
    padding: 0;
`

const Title = styled(Typography)`    
    margin-left: 20px;
    color: #fff;
`

const BackButton = styled(IconButton)`
    padding: 5px;
    margin-left: 15px;
    color: #fff;
`

const BlockDrawModal = ({
    headerProps,
    handleCancel,
    handleConfirm,

    title,
    onSubmit,
    onBack,
    ...props
}) => {

    console.debug("Modal onSubmit: ", onSubmit)
    console.debug("Modal onBack: ", onBack)


    return (
        <Modal
            fullWidth
            maxWidth="sm"
            fullScreen={true}
            //disableBackdropClick={true}
            {...headerProps}
        >   
            <Header disableTypography id="max-width-dialog-title">
                <BackButton aria-label="close" onClick={handleCancel}>
                    <ArrowBackIosIcon />
                </BackButton>      
                <Title variant="h6">
                    <FormattedMessage {...title} />
                </Title>         
            </Header>
            <Content className="dialog-content">
                <Container>
                    <FullPageMap
                    />
                    <BlockFormStepButton
                        cancelTitle={ButtonMessages.cancel}
                        submitTitle={ButtonMessages.next}
                        //cancelDisabled={true}
                        //submitDisabled={pristine || invalid}
                        onSubmit={handleConfirm}
                        onCancel={handleCancel}
                    />   
                </Container>
            </Content>
            <DialogActions> 
                                   
            </DialogActions>
        </Modal>
    )
}


BlockDrawModal.propTypes = {

}

export default BlockDrawModal