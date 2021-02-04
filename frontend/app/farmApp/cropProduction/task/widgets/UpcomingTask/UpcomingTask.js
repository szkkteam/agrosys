import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Redirect, useLocation, Switch } from "react-router-dom";

import {
    TaskListItem
} from '../../components'

import InfoIcon from '@material-ui/icons/Info';

import {
    IconButton,
    Card,
    CardHeader,
    CardContent,

    List,
} from '@material-ui/core'

const UpcomingTask = ({

}) => {
    return (
        <Card style={{height: "100%"}}>
            <CardHeader                
                action={
                    <IconButton>
                        <InfoIcon />
                    </IconButton>
                }
                title="Upcoming tasks"
                subheader="List of tasks"
            />
            <CardContent>
                <List>
                    <TaskListItem />
                    <TaskListItem />
                    <TaskListItem />
                </List>
            </CardContent>
        </Card>
    )
}

UpcomingTask.propTypes = {

}

export default UpcomingTask
