import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Redirect, useParams, Switch } from "react-router-dom";
import { ROUTES } from 'farmApp/routes'

import { 
    MasterList,
    DataLoading
} from 'components'

import {
    OperationMasterList,
    OperationListItem
} from 'farmApp/operation/components'

import {
    WidgetMedium,
} from 'farmApp/components'

import {
    List,
    Button,
} from '@material-ui/core'

const ScrollList = styled(List)`
    width: 100%;
    overflow-y: auto;
`

const UpcomingTask = ({

}) => {
    const params = useParams()

    const data = [
        {title: "Pruning", area: 136791, dates: {start: new Date(2021, 1, 26)}},
        {title: "Planting", area: 136791, dates: {start: new Date(2021, 2, 26)}},
        {title: "Harvesting", area: 136791, dates: {start: new Date(2021, 3, 26)}},
    ]
    
    return (
        <WidgetMedium
            title="Upcoming tasks"
            subheader="For all crops"
            link={{
                to: ROUTES.OperationMap,
                title: "show more"
            }}
            headerProps={{
                shrinkHeader: true
            }}
        >
            <MasterList
                //isLoading={isLoading}
            >
                {data.map((d, i) => (
                    <OperationListItem key={i} {...d} />
                ))}
            </MasterList>
        </WidgetMedium>
    )
}

UpcomingTask.propTypes = {

}

export default UpcomingTask
