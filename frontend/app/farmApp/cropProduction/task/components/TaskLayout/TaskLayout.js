import React, { useEffect, useState, useContext, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { VIEW_CALENDAR, VIEW_LIST } from '../../constants'

import DateRangeIcon from '@material-ui/icons/DateRange';
import ListIcon from '@material-ui/icons/List';

import { 
    TableLayout
} from 'farmApp/components'

import {
    TaskCalendarLayout,
    TaskTable
} from '../../components'


const TaskLayout = ({
    
}) => {
  
    const [currentView, setCurrentView] = useState(VIEW_CALENDAR)

    const views = [
        {value: VIEW_CALENDAR, icon: DateRangeIcon, component: TaskCalendarLayout},
        {value: VIEW_LIST, icon: ListIcon, component: TaskTable},
    ]

    return (
        <TableLayout
            title={ currentView === VIEW_CALENDAR? messages.calendarTitle : messages.listTitle}
            onViewChange={setCurrentView}
            primaryAction={{
                title: messages.addNewTitle,
            }}
            views={views}
        />        
    )
}


TaskLayout.propTypes = {

}

export default TaskLayout