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


const currentViewEnum = {
  LIST: "list",
  CALENDAR: "calendar",
}

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
    if (props.tasks.length) {
      startDate = props.tasks[0].startDate
      endDate = props.tasks[props.tasks.length - 1].endDate
    }

    this.state = {
      currentView: currentViewEnum.LIST,
      startDate,
      endDate,
    }

  }

  //onNavigate={(d, v, c) => console.log("D: " + d + " V: " + v + " C: ", c)}
  render() {
    const { tasks, ...props } = this.props
    const { currentView, startDate, endDate } = this.state

    const length = dates.diff(startDate, endDate, 'day')
    return (
      <div className="task-container">
        <LocalizationProvider dateAdapter={MomentUtils}>
            <DCalendar
              selectable
              step={60}
              showMultiDayTimes
              events={tasks}
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
/*
export default ({tasks, ...props}) => {

  let s = new Date()
  let end = new Date()
  if (tasks.lenght) {
    s = tasks[0].startĐate
    end = tasks[tasks.lenght - 1].endDate
  }

  const [start, setStart] = useState(s)
  const [length, setLength] = useState(dates.diff(s, end, 'day'))
  console.log("State length: ", length)
  
  return (
      <div className="task-container">
        <LocalizationProvider dateAdapter={MomentUtils}>
          <CalendarMonthView
          />

          <DCalendar
              selectable
              views={{
                month: true,
                list: CalendarListView,
              }}
              events={tasks}
              onNavigate={(date, view, action) => {
                if (view === 'list' && action === "NEXT") {
                  setLength(dates.diff(start, date, 'day'))
                } else if (view === 'list' && action === "PREVIOUS") {
                  setStart(date)
                }
              }}
              onView={(e) => console.log("On view change: ", e)}
              defaultView="list"
              messages={{
                list: 'List',
              }}
              length={length}
              step={60}
              showMultiDayTimes
              components={{
                  timeSlotWrapper: ColoredDateCellWrapper,
                  event: CalendarTask,
                  toolbar: DatePickerToolbar
              }}
              localizer={localizer}
              {...props}
          />
        </LocalizationProvider>
      </div>
  )
}*/