import React from 'react'
import { Calendar, Views, momentLocalizer  } from 'react-big-calendar'
import moment from 'moment'
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import {
    TaskComponent,
} from 'production/components'

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import './productiontaskcalendar.scss'

const localizer = momentLocalizer(moment)
let allViews = Object.keys(Views).map(k => Views[k])

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  })

const DCalendar = withDragAndDrop(Calendar);


export default ({...props}) => (
    <div className="task-container">
        <DCalendar
            selectable
            views={allViews}
            step={60}
            showMultiDayTimes
            components={{
                timeSlotWrapper: ColoredDateCellWrapper,
                event: TaskComponent,
            }}
            localizer={localizer}
            {...props}
        />
    </div>
)
 