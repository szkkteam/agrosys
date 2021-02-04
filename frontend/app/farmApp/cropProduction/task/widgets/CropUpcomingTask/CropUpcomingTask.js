import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Redirect, useParams, Switch } from "react-router-dom";
import { ROUTES } from 'farmApp/routes'
import { withLinkComponent } from 'utils/hoc'

import {
    TaskListItem
} from '../../components'

import {
    Card,
    CardFab,
    CardHeader,
    CardInfo
} from 'farmApp/components/Card'

import {
    List,
    Button,
} from '@material-ui/core'

const ScrollList = styled(List)`
    width: 100%;
    overflow-y: auto;
`

const LinkButton = withLinkComponent(Button)

const CropUpcomingTask = ({

}) => {
    const params = useParams()
    
    return (
        <Card>
            <CardHeader                
                action={<CardInfo title={messages.tooltip}/>}
                title="Upcoming tasks"
            >
                <CardFab />
            </CardHeader>
            <ScrollList>
                <TaskListItem />
                <TaskListItem />
                <TaskListItem />
                <TaskListItem />
                <TaskListItem />
                <TaskListItem />
            </ScrollList>
            <LinkButton
                to={ROUTES.CropProductionTaskView}
                params={params}
            >
                show more
            </LinkButton>
        </Card>
    )
}

CropUpcomingTask.propTypes = {

}

export default CropUpcomingTask
