import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { messages as ButtonMessages } from 'components/Button'
import { FieldFormStepButton } from '..'

import { Modal } from 'site/components'

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
import BlockList from './BlockList'

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

const BackButton = styled(IconButton)`
    padding: 5px;
    margin-left: 15px;
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

const FixedBlockList = styled(props => <BlockList {...props}/>)`
    width: ${listWidth}px;
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

const FieldDrawModal = ({
    headerProps,
    handleCancel,
    handleConfirm,

    title,
    onSubmit,
    onBack,
    ...props
}) => {

    const [open, setOpen] = useState(false)
    const [panel, setPanel] = useState(null)

    const [blockSelected, setblockSelected] = useState(false)

    const closeDrawer = (e) => {
        setOpen(false)
    }

    const openDrawer = (panel) => (e) => {
        setPanel(panel)
        setOpen(true)
        // TODO: Update this part
        setblockSelected(true)
    }

    return (
        <Modal
            fullWidth
            maxWidth="sm"
            fullScreen={true}
            //disableBackdropClick={true}
            {...headerProps}
        >   
            <Header disableTypography id="max-width-dialog-title">
                <div
                    style={{
                        display: "flex"
                    }}
                >
                    <BackButton aria-label="close" onClick={handleCancel}>
                        <ArrowBackIosIcon />
                    </BackButton>      
                    <Title variant="h6">
                        <FormattedMessage {...title} />
                    </Title>         
                </div>
                <ButtonContainer
                >
                    <Button
                        variant="contained"
                        color="default"
                        onClick={openDrawer(listBlock)}
                    >
                        Select block
                    </Button>
                    <Button
                        variant="contained"
                        color="default"
                        disabled={!blockSelected}
                        onClick={openDrawer(listField)}
                    >
                        Select template
                    </Button>
                    <Button
                        variant="contained"
                        color="default"
                        disabled={!blockSelected}
                        //onClick={toggleDrawer(true)}
                    >
                        Upload parcels
                    </Button>
                </ButtonContainer>
            </Header>
            <Content className="dialog-content">
                <Drawer
                    anchor="right"
                    open={open}
                    onClose={closeDrawer}
                >
                    { panel === listBlock
                        ? <FixedBlockList />
                        : <FixedFieldList />
                    }
                </Drawer>
                <Container>
                    <FullPageMap
                    />                    
                    <FieldFormStepButton
                        cancelTitle={ButtonMessages.cancel}
                        submitTitle={ButtonMessages.next}
                        //cancelDisabled={true}
                        submitDisabled={!blockSelected}
                        onSubmit={handleConfirm}
                        onCancel={handleCancel}
                    />   
                </Container>
            </Content>
        </Modal>
    )
}


FieldDrawModal.propTypes = {

}

export default FieldDrawModal