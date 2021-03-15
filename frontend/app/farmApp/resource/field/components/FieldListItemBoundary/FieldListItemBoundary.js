import React, { useContext, useMemo, useState, forwardRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import styled from 'styled-components'
import { ROUTES } from 'farmApp/routes'
import { useIntl, FormattedMessage } from 'react-intl'

import {
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemIcon,
    Typography,
    Avatar,
    IconButton
} from '@material-ui/core';

import { useFetchFields, useSelectField } from '../../hooks'

const FieldListItemBoundary = ({    
    geometry,
    className,
    ...props
}) => {

    const style = {
        "properties": {
            "stroke": "#eeed0e",
            "stroke-width": 1.5,
            "stroke-opacity": 1,
            "fill": "#ffffff",
            "fill-opacity": 0.2
          },
    }
    const mapBoxURL = useMemo(() => {
        if (geometry) {
            const mergedGeoJson = Object.assign(geometry.features[0], style)
            const geoJsonUrlEncoded = encodeURIComponent(JSON.stringify(mergedGeoJson))
            return `https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/geojson(${geoJsonUrlEncoded})/auto/48x48@2x?access_token=pk.eyJ1Ijoib25lc29pbCIsImEiOiJjamsydmM2Yngwd3EyM3FyeWVyOWF0cTByIn0.Crc52Fh0B1P-2M_mLrlllg&attribution=false`            
        } else {
            return "https://via.placeholder.com/48/48"
        }

    }, [geometry])


    return (
        <ListItemAvatar>
            <Avatar
                style={{width: "48px", height: "48px"}}
                variant="rounded"
                sizes="48px"
                src={mapBoxURL }
            >

            </Avatar>
        </ListItemAvatar>
    )
}

FieldListItemBoundary.propTypes = {
    disableButton: PropTypes.bool,
    disableAction: PropTypes.bool,
}

export default FieldListItemBoundary