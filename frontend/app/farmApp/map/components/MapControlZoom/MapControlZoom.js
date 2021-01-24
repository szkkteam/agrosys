import React, { useState, useEffect, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

import {
    IconButton
} from '@material-ui/core'

import { useMapContainerContext } from '../../hooks'

const Container = styled.div`
    position: absolute;
    z-index: 3;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
`

const ControlGroup = styled.ul`
    ${({theme}) => `
        box-shadow: 0 5px 10px rgba(0,0,0,.25);
        background-color: ${theme.palette.primary.main};
        list-style-type: none;
        padding: 0;
        margin: 10px 0;
        border-radius: 20px;

        & li {
            position: relative;
            margin-bottom: 2px;
        }

        & li:first-child {
            border-bottom: 1px solid #222;
        }
    `}
    
`

const Button = styled(IconButton)`
    ${({theme, disabled}) => `
        & span {
            ${disabled? '': `color: ${theme.palette.primary.contrastText};`}
        }
    `}
`


const MapControlZoom = ({

}) => {
    const [minZoomReached, setMinZoomReached] = useState(false)
    const [maxZoomReached, setMaxZoomReached] = useState(false)

    const {
        mapRef
    } = useMapContainerContext()

    const zoomIn = () => {
        mapRef && mapRef.zoomIn()
    }

    const zoomOut = () => {
        mapRef && mapRef.zoomOut()
    }

    const onZoomend = useCallback(() => {
        const currentZoom = mapRef.getZoom()

        const minZoom = mapRef.getMinZoom()
        const maxZoom = mapRef.getMaxZoom()

        setMinZoomReached(currentZoom === minZoom)
        setMaxZoomReached(currentZoom === maxZoom)
    })

    useEffect(() => {
        mapRef && mapRef.on('zoomend', onZoomend)
        return () => {
            mapRef && mapRef.off('zoomend', onZoomend)
        }
    }, [mapRef, onZoomend])

    
    return (
        <Container>
            <ControlGroup>
                <li>
                    <Button 
                        disabled={maxZoomReached}
                        onClick={zoomIn}
                    >
                        <AddIcon  />
                    </Button>
                </li>
                <li>
                    <Button
                        disabled={minZoomReached}
                        onClick={zoomOut}
                    >
                        <RemoveIcon />
                    </Button>
                </li>
            </ControlGroup>
        </Container>
    )
}

MapControlZoom.propTypes = {

}

export default MapControlZoom