import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import globalMessages from 'messages'
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
    TaskMasterList,
    TaskListItem
} from 'farmApp/operation/task/components'

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
    const intl = useIntl()
    const params = useParams()

    const data = [
        {
            cropType: { title: "Őszi búza", short: "őb" }, title: "Szántás", totalArea: 120, completedArea: 80, dates: { start: new Date() },
        },
        {
            cropType: { title: "Őszi búza", short: "őb" }, title: "Őszi búza vetés", totalArea: 120, completedArea: 35.2, dates: { start: new Date(2021, 5, 1) },
        },
        {
            cropType: { title: "Őszi búza", short: "őb" }, title: "Őszi búza aratás", totalArea: 120, completedArea: 0, dates: { start: new Date(2021, 7, 11) },            
        }
    ]
    
    return (
        <WidgetMedium
            title={intl.formatMessage(messages.title)}
            subheader={intl.formatMessage(messages.subheader)}
            link={{
                to: ROUTES.OperationTaskMap,
                title: intl.formatMessage(globalMessages.showMore)
            }}
            headerProps={{
                shrinkHeader: true
            }}
        >
            <MasterList
                //isLoading={isLoading}
            >
                {data.map((d, i) => (
                    <TaskListItem key={i} data={d} />
                ))}
            </MasterList>
        </WidgetMedium>
    )
}

UpcomingTask.propTypes = {

}

export default UpcomingTask
