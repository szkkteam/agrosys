import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Redirect, useLocation, Switch } from "react-router-dom";

import InfoIcon from '@material-ui/icons/Info';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {
    Grid,
    Typography,
    Avatar,
    IconButton,
    Card,
    CardHeader,
    CardContent,
    Collapse,

    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction,
} from '@material-ui/core'

const TaskDetailContainer = styled.div`
    padding-left: 26px
`

const TaskListItem = ({

}) => {
    const [open, setOpen] = useState(false)

    const handleOpenClose = () => {
        setOpen(!open)
    }

    return (
        <>
            <ListItem
                button
            >
                <ListItemAvatar>
                    <Avatar>W</Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary="Harvesting, 4.3 ha"
                    secondary={
                        <>
                            <Typography variant="body2" component="span">
                                due in 4 days
                            </Typography>
                        </>
                    }
                />
                <ListItemSecondaryAction>
                    <IconButton
                        onClick={handleOpenClose}
                    >
                        <ExpandMore />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <TaskDetailContainer>
                    TODO: Task detail
                </TaskDetailContainer>
            </Collapse>
        </>
    )
}

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
