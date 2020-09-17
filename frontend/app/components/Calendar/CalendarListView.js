import PropTypes from 'prop-types'
import React, { useRef, useEffect } from 'react'
import moment from 'moment'

import addClass from 'dom-helpers/addClass'
import removeClass from 'dom-helpers/removeClass'
import getWidth from 'dom-helpers/width'
import scrollbarSize from 'dom-helpers/scrollbarSize'

import * as dates from 'react-big-calendar/lib/utils/dates'
import { navigate } from 'react-big-calendar/lib/utils/constants'
import { inRange } from 'react-big-calendar/lib/utils/eventLevels'
import { isSelected } from 'react-big-calendar/lib/utils/selection'

import { 
  CalendarTable,
} from 'components/Calendar'

function CalendarListView({
  disabled,
  selected,
  getters,
  accessors,
  localizer,
  components,
  length,
  date,
  events,
  columns,
  onTaskUpdate,
  onTaskDelete,
  onTaskAdded,
  ...props,
}) {
  
  let { messages } = localizer
  let end = dates.add(date, length, 'day')
  let range = dates.range(date, end, 'day')

  events = events.filter(event => inRange(event, date, end, accessors))
  events.sort((a, b) => +accessors.start(a) - +accessors.start(b))

  const { event: Event, date: AgendaDate } = components
  return (
    <div className="rbc-agenda-view">
        <CalendarTable
          columns={columns}
          data={events}
          editable={ !disabled? {                
            onRowUpdate: (newData, oldData) => 
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        newData.dates.startDate = moment(newData.dates.startDate).toDate()
                        newData.dates.endDate = moment(newData.dates.endDate).toDate()
                        onTaskUpdate && onTaskUpdate(newData, oldData)                                                                                 
                        resolve()
                    }, 1000)
                }),
            onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        onTaskDelete && onTaskDelete(oldData)
                        resolve()
                    }, 1000)
                }),
            /* FIXME: This is currently disabled, because not working in Material-Table v.1.68.0
            onRowAdd: newData =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        onTaskAdded && onTaskAdded(newData)
                        resolve()
                    }, 1000)
                }),
              */
            
        } : {
          // TODO: Add props for disabled list view
        }}
          {...props}
        />          
    </div>
  )
}

CalendarListView.propTypes = {
  events: PropTypes.array,
  date: PropTypes.instanceOf(Date),
  length: PropTypes.number.isRequired,

  selected: PropTypes.object,

  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,
  localizer: PropTypes.object.isRequired,
}

CalendarListView.defaultProps = {
  length: 30,
}

CalendarListView.range = (start, { length = Agenda.defaultProps.length }) => {
  let end = dates.add(start, length, 'day')
  return { start, end }
}

CalendarListView.navigate = (date, action, { length = Agenda.defaultProps.length }) => date

CalendarListView.title = (start, { length = Agenda.defaultProps.length, localizer }) => {
  let end = dates.add(start, length, 'day')
  return localizer.format({ start, end }, 'agendaHeaderFormat')
}
/*
CalendarListView.title = (start, { length = Agenda.defaultProps.length, localizer }) => {
  return (
    <button>
      Click me
    </button>
  )
}*/

export default CalendarListView