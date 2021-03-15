import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Redirect, useParams, Switch } from "react-router-dom";
import { ROUTES } from 'farmApp/routes'

import {
    TaskListItem
} from '../../components'

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

const CropUpcomingTask = ({

}) => {
    const params = useParams()
    
    return (
        <WidgetMedium
            title="Upcoming tasks"
            link={{
                to: ROUTES.CropProductionTaskView,
                title: "show more"
            }}
        >
            <ScrollList>
                <TaskListItem />
                <TaskListItem />
                <TaskListItem />
                <TaskListItem />
                <TaskListItem />
                <TaskListItem />
            </ScrollList>            
        </WidgetMedium>
    )
}

CropUpcomingTask.propTypes = {

}

export default CropUpcomingTask
