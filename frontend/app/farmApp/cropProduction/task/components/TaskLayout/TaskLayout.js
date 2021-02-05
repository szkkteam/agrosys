import React, { useEffect, useState, useContext, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { Redirect, useLocation } from "react-router-dom";
import { useHeightDifference } from 'utils/hooks'
import { HashRoute } from 'utils/route'

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
    PrimaryActionButton,
    ViewButtonGroup,
    PageHeader,
    PageContent,
    PageToolbar
} from 'components'

import {
    TaskViewButtons,
    TaskCalendarLayout,
    TaskTable
} from '../../components'

const Container = styled.div`
    padding: 0px 20px;
    padding-top: 15px;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const FlexGrid = styled(Grid)`
    display: flex;
`

const Spacer = styled.div`
    flex-grow: 1;
`


const TaskRoutes = ({
}) => {
    return (
        <>
            <HashRoute path={VIEW_CALENDAR} component={props => <TaskCalendarLayout {...props} />} />
            <HashRoute path={VIEW_LIST} component={props => <TaskTable {...props} />} />
            <HashRoute path="" component={({location}) => <Redirect to={{...location, hash: VIEW_CALENDAR}} />} />
        </>
    )
}


const TaskLayout = ({
    
}) => {
  
    const [currentView, setCurrentView] = useState(VIEW_CALENDAR)

    const views = [
        {value: VIEW_CALENDAR, icon: DateRangeIcon},
        {value: VIEW_LIST, icon: ListIcon},
    ]

    return (
        <PageContent>
            <PageHeader
                title={ currentView === VIEW_CALENDAR? messages.calendarTitle : messages.listTitle}
            >
                
            </PageHeader>
            <PageToolbar>
                <Grid
                    container
                    justify="flex-end"
                >
                    <FlexGrid item xs={9}>
                        <Spacer />
                        <PrimaryActionButton
                            title={messages.addNewTitle}
                        />
                    </FlexGrid>
                    <FlexGrid item xs={3}>      
                        <Spacer />
                        <ViewButtonGroup
                            handleChange={setCurrentView}
                            items={views}
                        />                      
                    </FlexGrid>
                </Grid>
            </PageToolbar>           
            <TaskRoutes 
            />
        </PageContent>
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