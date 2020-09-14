import React, { useState } from 'react'
import { Calendar, Views, momentLocalizer  } from 'react-big-calendar'
import moment from 'moment'
import * as dates from 'react-big-calendar/lib/utils/dates'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { navigate } from 'react-big-calendar/lib/utils/constants'

import { LocalizationProvider } from '@material-ui/pickers';
import MomentUtils from '@material-ui/pickers/adapter/moment';

import {
    CalendarTask,
    CalendarListView,
    CalendarToolbar,
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


const localizer = momentLocalizer(moment)

export default class MyCalendar extends React.Component {

  constructor(props) {
    super(props)

    // Calculate the default range for today
    let startDate = moment(new Date()).toDate()
    let endDate = moment(new Date()).toDate()

    // If tasks are already added before the switch re-calculate the date ranges
    if (props.events.length) {
      startDate = props.events[0].dates.startDate
      endDate = props.events[props.events.length - 1].dates.endDate
    }

    this.state = {
      startDate,
      endDate,
    }

  }

  //onNavigate={(d, v, c) => console.log("D: " + d + " V: " + v + " C: ", c)}
  render() {
    const { events, children, ...props } = this.props
    const { startDate, endDate } = this.state
    const length = dates.diff(startDate, endDate, 'day')
    return (
      <div className="task-container">
        <LocalizationProvider dateAdapter={MomentUtils}>
            {children}
            <DCalendar
              selectable
              step={60}
              showMultiDayTimes
              events={events}
              messages={{
                list: 'List',
              }}
              views={{
                month: true,
                list: CalendarListView,
              }}
              defaultDate={startDate}              
              length={length}
              defaultView="list"
              components={{
                timeSlotWrapper: ColoredDateCellWrapper,
                event: CalendarTask,
                toolbar: (props) => <CalendarToolbar
                                      start={startDate}
                                      end={endDate}
                                      onEndDateChange={(data) => this.setState({endDate: data})}
                                      onStartDateChange={(data) => this.setState({startDate: data})}
                                      {...props}/>
              }}
              localizer={localizer}
              {...props}
            /> 
          
        </LocalizationProvider>
      </div>
    )
  }
}
