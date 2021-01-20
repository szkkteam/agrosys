import React, { useState } from 'react'
import messages from './messages'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { messages as ButtonMessages } from 'components/Button'
import { FieldFormStepButton } from '..'

import { Modal, ModalHeader, ModalContent } from 'components'
import BackButton from 'components/Modal/components/BackButton'
import { useModalContext } from 'components/Modal/hooks'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {
    DialogTitle,
    DialogActions,
    DialogContent,
    Typography,
    IconButton,
    Button,
    Drawer,
} from '@material-ui/core';


import { LeafletMap } from 'components/Map/components'

import FieldList from './FieldList'

const listWidth = 350

const listField = 'listField'
const listBlock = 'listBlock'

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
        position: relative;
    `}    
`

const Content = styled(DialogContent)`
    padding: 0;
`

const Title = styled(Typography)`    
    margin-left: 20px;
    color: #fff;
`


const Explanation = styled.div`
    z-index: 9999;
    position: absolute;
    top: 30%;
    left: 20%;
    background-color: rgba(0,0,0,0.7);
    padding: 20px;
    p {
        color: white; 
    }
`

const FixedFieldList = styled(props => <FieldList {...props}/>)`
    width: ${listWidth}px;
`


const ButtonContainer = styled.div`
    display: flex;
    position: absolute;
    right: ${listWidth}px;
    > button {
        margin-left: 15px;
        margin-right: 15px;
    }
`

const FieldDrawDialog = ({
    handleCancel,
    handleConfirm,

    //title,
    onSubmit,
    onBack,
    ...props
}) => {

    const [open, setOpen] = useState(false)

    const closeDrawer = (e) => {
        setOpen(false)
    }

    const openDrawer = (e) => {        
        setOpen(true)
    }

    return (
        <Modal
            fullWidth
            maxWidth="sm"
            fullScreen={true}
            //disableBackdropClick={true}
        >   
            <ModalHeader
                title={messages.title}
                startComponent={
                    <BackButton />
                }
            >
                <ButtonContainer
                >
                    <Button
                        variant="contained"
                        color="default"
                        onClick={openDrawer}
                    >
                        Select template
                    </Button>
                    <Button
                        variant="contained"
                        color="default"
                        //onClick={toggleDrawer(true)}
                    >
                        Upload parcels
                    </Button>
                </ButtonContainer>
            </ModalHeader>            
            <Content className="dialog-content">
                <Drawer
                    anchor="right"
                    open={open}
                    onClose={closeDrawer}
                >
                    <FixedFieldList />
                </Drawer>
                <Container>
                    <FullPageMap
                    />                    
                    <FieldFormStepButton
                        cancelTitle={ButtonMessages.cancel}
                        submitTitle={ButtonMessages.next}
                        //cancelDisabled={true}
                        onSubmit={handleConfirm}
                        onCancel={handleCancel}
                    />   
                </Container>
            </Content>
        </Modal>
    )
}


FieldDrawDialog.propTypes = {

}

export default FieldDrawDialog