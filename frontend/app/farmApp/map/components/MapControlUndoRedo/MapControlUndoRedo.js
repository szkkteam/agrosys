import React, { useState, useEffect, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import messages from 'messages'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';

import {
    Button
} from '@material-ui/core'

import { useMapContainerContext } from '../../hooks'

const Container = styled.div`
    position: absolute;
    z-index: 3;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
`

const ControlGroup = styled.ul`
    ${({theme}) => `
        box-shadow: 0 5px 10px rgba(0,0,0,.25);
        background-color: ${theme.palette.primary.main};
        list-style-type: none;
        padding: 0;
        margin: 0;
        border-radius: 20px;
        display: flex;
        flex-direction: row;

        & li {
            display: block;
            position: relative;
            margin-right: 2px;
        }

        & li:first-child {
            border-right: 1px solid #222;
        }

    `}
    
`

const IconButton = styled(Button)`
    ${({theme, disabled}) => `
        ${disabled? '': `color: ${theme.palette.primary.contrastText};`}
        & span {
            
        }
    `}
`


const MapControlUndoRedo = ({

}) => {
   
    const {
        mapRef
    } = useMapContainerContext()

    return (
        <Container>
            <ControlGroup>
                <li>
                    <IconButton 
                        //disabled={maxZoomReached}
                        //onClick={zoomIn}
                        startIcon={
                            <UndoIcon  />
                        }
                    >
                        <FormattedMessage {...messages.undo} />
                    </IconButton>
                </li>
                <li>
                    <IconButton
                        //disabled={minZoomReached}
                        //onClick={zoomOut}
                        endIcon={
                            <RedoIcon  />
                        }
                    >
                        <FormattedMessage {...messages.redo} />
                    </IconButton>
                </li>
            </ControlGroup>
        </Container>
    )
}

MapControlUndoRedo.propTypes = {

}

export default MapControlUndoRedo