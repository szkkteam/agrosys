import React, { useState } from 'react'
import messages from './messages'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { Modal, ModalHeader, ModalContent } from 'components'
import BackButton from 'components/Modal/components/BackButton'
import { useModalContext } from 'components/Modal/hooks'

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

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`


const Content = styled(DialogContent)`
    padding: 0;
`

const FixedFieldList = styled(props => <FieldList {...props}/>)`
    width: ${listWidth}px;
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


    const aloisTieberGeom = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    15.80683171749115,
                    47.0677724300821
                  ],
                  [
                    15.806558132171629,
                    47.067122035283184
                  ],
                  [
                    15.807357430458067,
                    47.0668699138166
                  ],
                  [
                    15.807212591171263,
                    47.06642413091398
                  ],
                  [
                    15.80828547477722,
                    47.066442400778335
                  ],
                  [
                    15.808795094490051,
                    47.06647163254827
                  ],
                  [
                    15.809036493301392,
                    47.06707088029944
                  ],
                  [
                    15.808634161949158,
                    47.06743261805917
                  ],
                  [
                    15.807738304138184,
                    47.06752031169185
                  ],
                  [
                    15.807239413261414,
                    47.06764089020118
                  ],
                  [
                    15.80683171749115,
                    47.0677724300821
                  ]
                ]
              ]
            }
          }
        ]
      }
    

    // Payload should be an array of geometries. Also give the possibility to the user to fill out some data directly on the map
    // 
    const dummyPayload = [
        //{ title: "Valami tábla", geometry: dummyGeojson, area: 13231.23 },
        //{ title: "Másik tábla", geometry: dummyGeojson, area: 13231.23, lpis: {meparId: "7634XD-45"} },
        { geometry: aloisTieberGeom, area: 45000 },
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