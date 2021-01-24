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
    top: 10px;
    left: 20px;
    //transform: translateY(-50%);
`


const MapControlGeoSearch = ({

}) => {
 
    const {
        mapRef
    } = useMapContainerContext()

    
    return (
        <Container>
            
        </Container>
    )
}

MapControlGeoSearch.propTypes = {

}

export default MapControlGeoSearch