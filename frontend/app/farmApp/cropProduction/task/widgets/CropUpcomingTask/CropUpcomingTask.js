import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Redirect, useLocation, Switch } from "react-router-dom";

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

const CropUpcomingTask = ({

}) => {
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
            <Button>
                show more
            </Button>
        </Card>
    )
}

CropUpcomingTask.propTypes = {

}

export default CropUpcomingTask
