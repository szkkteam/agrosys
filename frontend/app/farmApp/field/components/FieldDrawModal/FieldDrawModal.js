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
    IconButton
} from '@material-ui/core';

import { LeafletMap } from 'farmApp/map/components'

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

const FieldDrawModal = ({
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
                    <Explanation>
                        <p>
                            Ezen a nézeten a user kitud választani egyet a már (resource/fields) oldalon létrehozott fizikai blokkok közül<br/>
                            <br/>A térképen látszódni fognak a fizikai blokkok, továbbá a jobb felső sarokban egy Drawer/Dropdown segítségével tudja a user kiválasztani<br/>
                            Amint az megvan, a jobb felső sarokban egy Drawer/Dropdown aktívvá válik, amivel az adott blokkra értelmezett korábbi parcella sablont<br/>
                            tudja kiválasztani. Ugyan így szerepel majd egy gomb, amire ha rákattint akkor feltud tölteni geometriai shape fájlt.
                            <br/> Ha nem tud feltölteni fájlt, vagy új parcella sablont akar létrehozni, akkor automatikusan a kurzor rajzoló üzemmódba kerül és a user<br/>
                            tud polygonokat rajzolni a térképre.
                            <br/><br/>Ha ez megvan, akkor a következő nézetben a user kitölti az adott parcellához tartozó további infókat
                        </p>
                    </Explanation>
                    <FieldFormStepButton
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


FieldDrawModal.propTypes = {

}

export default FieldDrawModal