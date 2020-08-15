import React, { useState } from 'react'
import { momentLocalizer  } from 'react-big-calendar'
import moment from 'moment'
import * as dates from 'react-big-calendar/lib/utils/dates'
import { wrapAccessor } from 'react-big-calendar/lib//utils/accessors'

import { LocalizationProvider } from '@material-ui/pickers';
import MomentUtils from '@material-ui/pickers/adapter/moment';

import {
    CalendarTask,
    CalendarListView,
    CalendarView,
    CalendarToolbar,
} from 'components/Calendar'

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import './draggablecalendar.scss'


const currentViewEnum = {
  LIST: "list",
  CALENDAR: "calendar",
}

const localizer = momentLocalizer(moment)

const getAccessors = ({startAccessor, endAccessor, allDayAccessor, tooltipAccessor, titleAccessor, resourceAccessor, resourceIdAccessor, resourceTitleAccessor}) => {
  return {
    start: wrapAccessor(startAccessor? startAccessor: (e) = e.start),
    end: wrapAccessor(endAccessor? endAccessor: (e) => e.end),
    allDay: wrapAccessor(allDayAccessor? allDayAccessor: (e) => e.allDay),
    tooltip: wrapAccessor(tooltipAccessor? tooltipAccessor: (e) => e.tooltip),
    title: wrapAccessor(titleAccessor? titleAccessor: (e) => e.title),
    resource: wrapAccessor(resourceAccessor? resourceAccessor: (e) => e.resource),
    resourceId: wrapAccessor(resourceIdAccessor? resourceIdAccessor: (e) => e.resourceId),
    resourceTitle: wrapAccessor(resourceTitleAccessor? resourceTitleAccessor: (e) => e.resourceTitle),
  }
}

export default class MyCalendar extends React.Component {

  constructor(props) {
    super(props)

    let startDate = moment(new Date()).toDate()
    let endDate = moment(new Date()).toDate()
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

  render() {
    const { tasks, ...props } = this.props
    const { currentView, startDate, endDate } = this.state


    console.log("Calendar props: ", props)
    return (
      <div className="task-container">
        <LocalizationProvider dateAdapter={MomentUtils}>
          { currentView === currentViewEnum.CALENDAR?
            <CalendarView
              events={tasks}
              messages={{
                list: 'List',
              }}
              views={{
                month: true,
                list: CalendarListView,
              }}
              onView={(view) => {
                if (view === "list") this.setState({currentView: currentViewEnum.LIST})
              }}
              defaultView="list"
              components={{
                toolbar: CalendarToolbar
              }}
              localizer={localizer}
              {...props}
            /> :
          <div className="rbc-addons-dnd rbc-calendar">
            <CalendarToolbar
              start={startDate}
              end={endDate}
              views={{
                month: true,
                list: CalendarListView,
              }}
              onView={(view) => {
                this.setState({currentView: currentViewEnum.CALENDAR})
              }}
              view="list"
              messages={{
                list: 'List',
              }}
              localizer={localizer}
              onStartChange={(date) => this.setState({startDate: date.toDate()})}
              onEndChange={(date) => this.setState({endDate: date.toDate()})}
            />
            <CalendarListView
              events={tasks}              
              accessors={getAccessors(props)}
              localizer={localizer}
              {...props}
            />
          </div>
          }
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