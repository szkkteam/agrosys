import React, { useRef, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import globalMessages from 'messages'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Redirect, useLocation, Switch } from "react-router-dom";
import { differenceInCalendarDays } from 'date-fns'
import { useConvertArea } from 'utils/hooks'

import {
    SplitButton
} from 'components'

import InfoIcon from '@material-ui/icons/Info';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {
    Typography,
    Avatar,
    IconButton,
    Collapse,

    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction,
} from '@material-ui/core'

const TaskDetailContainer = styled.div`
    padding-left: 26px
`

const TaskListItem = ({
    disableButton=false,
    title,
    dates,
    area: areaM2,
}) => {
    const intl = useIntl()
    const [open, setOpen] = useState(false)

    const handleOpenClose = () => {
        setOpen(!open)
    }

    const today = new Date()
    const startDueDate = differenceInCalendarDays(dates.start, today)
    const area = useConvertArea(areaM2)

    const listProps = disableButton? { ContainerComponent: 'div' } : {button: true}

    return (
        <>
            <ListItem
                {...listProps}
            >
                <ListItemAvatar>
                    <Avatar>W</Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={`${title}, ${area}`}
                    secondary={
                        <>
                            <Typography variant="body2" component="span">
                                {intl.formatRelativeTime(startDueDate, 'days')}
                            </Typography>
                        </>
                    }
                />
                <ListItemSecondaryAction>
                    <SplitButton
                        variant="outlined"
                        options={[
                            {title: globalMessages.complete, },
                            {title: globalMessages.pending}
                        ]}
                    />
                    
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
/*
<IconButton
                        onClick={handleOpenClose}
                    >
                        <ExpandMore />
                    </IconButton>
*/

TaskListItem.propTypes = {
    disableButton: PropTypes.bool
}

export default TaskListItem
