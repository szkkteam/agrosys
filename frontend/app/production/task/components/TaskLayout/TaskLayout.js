import React, { useEffect, useState, useContext, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { useRouteMatch, useHistory } from "react-router-dom";
import { useHeightDifference } from 'utils/hooks'

import { VIEW_CALENDAR, VIEW_LIST } from '../../constants'

import {
    Grid,
    Portal
} from '@material-ui/core';

import DateRangeIcon from '@material-ui/icons/DateRange';
import ListIcon from '@material-ui/icons/List';

import { 
    Table,
    TableHeader,
    TableBody
} from 'components/Table'

import {
    ToggleButton,
    ToggleButtonGroup
} from '@material-ui/lab'

import { 
    HeaderContentContext,
} from 'components'

import {
    TaskViewButtons,
    TaskCalendarLayout,
    TaskTable
} from '../../components'

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`


const StyledViewButtons = styled(props => <TaskViewButtons {...props} />)`
    float: right;
`

const TaskViews = ({
    view,
    handleChange,
    ...props
}) => {
    const onClick = (e, v) => {
        handleChange && handleChange(v)
    }

    return (
        <ToggleButtonGroup
            value={view}
            exclusive
            onChange={onClick}
            aria-label="block view"
            {...props}
        >
            <ToggleButton value={VIEW_CALENDAR} aria-label="map view">
                <DateRangeIcon />
            </ToggleButton>
            <ToggleButton value={VIEW_LIST} aria-label="list view">
                <ListIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    )
}


const TaskRoutes = ({
    view,
    ...props
}) => {

    const ViewComponent = useMemo(() => {
        switch(view) {
            case VIEW_CALENDAR:
                return TaskCalendarLayout
            case VIEW_LIST:
                return TaskTable
            default:
                return TaskTable
        }
    }, [view])
    
    return (
        <ViewComponent 
            {...props}
        />
    )
}

const TaskLayout = ({
    
}) => {
    const headerRef = useRef(null)
    const containerRef = useRef(null)

    const [currentView, setCurrentView] = useState(VIEW_CALENDAR)

    const height = useHeightDifference(containerRef, headerRef)

    return (
        <Container
            ref={containerRef}
        >
            <Table
            >
                <TableHeader 
                    ref={headerRef}
                    title={ currentView === VIEW_CALENDAR? messages.calendarTitle : messages.listTitle}
                    views={
                        <TaskViews
                            view={currentView}
                            handleChange={setCurrentView}
                        />
                    }
                />
                <TaskRoutes 
                    view={currentView}
                    height={height - 10}
                />
            </Table>  

        </Container>
    )
}

/*
                <StyledViewButtons
                    value={view}
                    onChange={setView}
                />
*/

TaskLayout.propTypes = {

}

export default TaskLayout