import React, { useRef, useState, useContext } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import {
    Grid,
    Button,
    Typography,
    IconButton,
    Divider
} from '@material-ui/core'

import {
    Card,
    CardFab,
    CardHeader,
    CardInfo
} from 'farmApp/components/Card'

import {
    FieldListItem,
} from 'farmApp/resource/field/components'

import { GridTable, DashboardWidget } from 'farmApp/components'

const ScrollTable = styled(GridTable)`
    //overflow-y: auto;
`

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
        <Card>
            <CardHeader
                shrinkHeader
                title={intl.formatMessage(messages.title)}
                action={<CardInfo title={messages.tooltip}/>}
            />
            <ScrollTable
                columns={columns}
                data={data}
                columnSpacing={3}
            />             
            <Button>
                show more
            </Button>
        </Card>        
    )
}

FieldWeather.propTypes = {

}

export default FieldWeather