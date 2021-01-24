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


import { MapContainer, MapControlUndoRedo, MapControlDraw, MapControlGeoSearch } from 'farmApp/map/components'

import FieldDrawFormButtons from '../FieldDrawFormButtons/FieldDrawFormButtons'

import FieldList from './FieldList'

const listWidth = 350

const listField = 'listField'
const listBlock = 'listBlock'

const Container = styled.div`
    position: relative;
    width: 100%;
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


    const dummyGeojson = {
        type: "Feature",
        properties: {},
        geometry: {
            type: "Polygon",
            coordinates: [[
                [-109.05, 41.00],
                [-102.06, 40.99],
                [-102.03, 36.99],
                [-109.04, 36.99],
                [-109.05, 41.00]
            ]]
        }
    }

    // Payload should be an array of geometries. Also give the possibility to the user to fill out some data directly on the map
    // 
    const dummyPayload = [
        { title: "Valami tábla", geometry: dummyGeojson, area: 13231.23 },
        { title: "Másik tábla", geometry: dummyGeojson, area: 13231.23, lpis: {mepar: "7634XD-45"} },
        { geometry: dummyGeojson, area: 13231.23 },
    ]


    const {
        handleCancel,
        handleConfirm
    } = useModalContext()
 
    const handleSubmit = () => {
        handleConfirm && handleConfirm(dummyPayload)
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
                    <MapContainer
                        controls={
                            <>
                            <MapControlGeoSearch />
                            <MapControlUndoRedo />
                            <MapControlDraw />
                            <FieldDrawFormButtons
                                onCancel={handleCancel}
                                onSubmit={handleSubmit}
                            />
                            </>
                        }
                    >
                        
                    </MapContainer>
                </Container>
            </Content>
        </Modal>
    )
}


FieldDrawDialog.propTypes = {

}

export default FieldDrawDialog