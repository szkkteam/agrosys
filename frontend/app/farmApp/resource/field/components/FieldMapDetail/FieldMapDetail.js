import React, { useContext, useMemo, useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages'
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { MASTER_DETAIL_BREAKPOINT } from 'farmApp/constants'

import {
    MapFieldCropTooltip
} from 'farmApp/components'

import { 
    MapContainer,
    MapControlGeoSearch,
    MapFeature,
    MapFeatureGroup
} from 'farmApp/map/components'

import {
    useMapContainerContext,
    useGeoJsonToLatLong,
    useDispatchAddEvent
} from 'farmApp/map/hooks'

import { useFetchFieldIds, useSelectField } from '../../hooks'

const FieldGeo = ({
    id,
}) => {
    const layerRef = useRef(null)
    const addEvent = useDispatchAddEvent()
    const { payload: { title, area, geometry }, isLoading } = useSelectField(id)

    const handleClick = (p, e) => {
      console.debug(p.getBounds())
      addEvent(p.getBounds())
    }

    return (
        !isLoading && <MapFeature
            ref={layerRef}
            feature={geometry}
            onClick={handleClick}
            tooltip={
              <MapFieldCropTooltip
                title={title}
                area={area}
                //onClick={handleClick}
                cropType={{
                  short: "őb",
                  title: "Őszi búza"                  
                }}
              />            
            }
        />
    )
}

const Inner = ({
    children,
}) => {
    const layerRef = useRef(null)
    const addEvent = useDispatchAddEvent()

    const {
        mapRef,
    } = useMapContainerContext()

    useEffect(() => {
        const bounds = layerRef && layerRef?.current.getBounds()
        bounds.isValid() && addEvent(bounds, false)
        //mapRef && mapRef.fitBounds(bounds)
    }, [layerRef])

    return (
        <MapFeatureGroup ref={layerRef}
          
        >
            {children}
        </MapFeatureGroup>
    )
}

const FieldMapDetail = ({
    
}) => {
    const { payload, isLoading } = useFetchFieldIds()
  
    return (
        <MapContainer
            controls={
                <>
                    <MapControlGeoSearch />
                </>
            }
        >
            <Inner>
                {!isLoading && payload && payload.map((id, i) => (
                    <FieldGeo key={i} id={id} />
                ))}
            </Inner>
        </MapContainer>
    )
}
/*
<FieldSideDetail
                    onClose={handleClose}
                />
*/

FieldMapDetail.propTypes = {

}

export default FieldMapDetail