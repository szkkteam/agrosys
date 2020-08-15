import React, { useState } from 'react'
import { Calendar, Views } from 'react-big-calendar'
import moment from 'moment'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import * as dates from 'react-big-calendar/lib/utils/dates'

import { LocalizationProvider } from '@material-ui/pickers';
import MomentUtils from '@material-ui/pickers/adapter/moment';

import {
    CalendarTask,
} from 'components/Calendar'

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import './draggablecalendar.scss'


const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })

const DCalendar = withDragAndDrop(Calendar);


export default ({events, ...props}) => {

  console.log("State length: ", length)
  
  return (
      <LocalizationProvider dateAdapter={MomentUtils}>
        <DCalendar
            selectable
            events={events}
            onNavigate={(date, view, action) => console.log("date: " + date + " view: " + view + " action: " + action )}
            onView={(e) => console.log("On view change: ", e)}            
            step={60}
            showMultiDayTimes
            components={{
                timeSlotWrapper: ColoredDateCellWrapper,
                event: CalendarTask,
            }}
            {...props}
        />
      </LocalizationProvider>
  )
}