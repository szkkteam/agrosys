import React, { useRef, useMemo, useLayoutEffect, useState } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import {
    WidgetContainer
} from 'components'

import {
    TaskSmallCard
} from 'farmApp/production/task/components'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import {
    List,
    ListItem,
    ListItemIcon,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListSubheader,
    ListItemSecondaryAction,
    Button,
    ButtonGroup,
    ClickAwayListener,
    Grow,
    Paper,
    Popper,
    MenuItem,
    MenuList,
    Select
} from '@material-ui/core'


const TaskItem = ({

}) => {

    const [selected, setSelected] = useState("Complete")

    const handleChange = (event) => {
        setSelected(event.target.value);
    };

    return (
        <ListItem
            button
        >
            <ListItemAvatar>
                <Avatar>
                    H
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary="Harvesting, 5ha (My wheat)"
                secondary="Oktober 6 - Oktober 22"
            />
            <ListItemSecondaryAction>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selected}
                    onChange={handleChange}
                >
                    <MenuItem value={"Complete"}>Completed</MenuItem>
                    <MenuItem value={"Pending"}>Pending</MenuItem>
                    <MenuItem value={"Reject"}>Rejected</MenuItem>
                </Select>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

const WidgetTaskSummary = ({
    title,
    ...props
}) => {


    return (
        <WidgetContainer
            headerProps={{
                title,
                subheader: "Show upcoming tasks for the selected crops"
            }}
            {...props}
        >                            
            <List
                subheader={
                    <ListSubheader>Upcoming tasks</ListSubheader>
                }
            >
                <TaskItem />
                <TaskItem />
                <TaskItem />
            </List>
        </WidgetContainer>
    )
}

WidgetTaskSummary.propTypes = {

}

export default WidgetTaskSummary