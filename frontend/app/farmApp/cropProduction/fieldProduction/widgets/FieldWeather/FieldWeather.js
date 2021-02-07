import React, { useRef, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { ROUTES } from 'farmApp/routes'

import {
    Grid,
    Button,
    Typography,
    IconButton,
    Divider
} from '@material-ui/core'

import {
    WidgetMedium,
} from 'farmApp/components'

import {
    FieldListItem,
} from 'farmApp/resource/field/components'

import { GridTable } from 'farmApp/components'

const WeatherColumn = ({

}) => {
    return (
        <div>
            <Typography variant="caption">
                6°/1°
            </Typography>
            <Typography variant="body2">
                1 mm
            </Typography>
            <Typography variant="body2">
                3 m/s
            </Typography>
        </div>
    )
}

const FieldWeather = ({

}) => {
    const intl = useIntl()

    const columns = [
        {title: 'Field', size: 3, render: (field, i) => <FieldListItem index={i} disableAction={true}/>},
        {title: 'Today', render: (field, i) => <WeatherColumn />},
        {title: 'Monday', render: (field, i) => <WeatherColumn />},
        {title: 'Tuesday', render: (field, i) => <WeatherColumn />},

    ]

    const data = [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
    ]

    return (
        <WidgetMedium
            //shrinkHeader
            title={intl.formatMessage(messages.title)}
            link={{
                title: "Show more",
                to: ROUTES.CropProductionSeasonView,
            }}
        >
            <GridTable
                columns={columns}
                data={data}
                columnSpacing={3}
            />             
        </WidgetMedium>        
    )
}

FieldWeather.propTypes = {

}

export default FieldWeather