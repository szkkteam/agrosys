import PropTypes from 'prop-types'
import React, { useRef, useEffect } from 'react'

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
  selected,
  getters,
  accessors,
  localizer,
  components,
  length,
  date,
  events,  
  ...props,
}) {
  const columns = React.useMemo(
    () => [
        {
          title: 'Start Date',
          cellStyle: {whiteSpace: "nowrap"},
          customSort: (a, b) => +accessors.start(a) - +accessors.start(b),
          type: 'datetime',
          //accessor: 'startDate',
          //Cell: props => <span>{localizer.format(accessors.start(props.value), 'agendaDateFormat')}</span>
          render: (rowData) => (
            <div>
              <span>{localizer.format(accessors.start(rowData), 'agendaDateFormat')}</span>
              <span> - </span>
              <span>{localizer.format(accessors.end(rowData), 'agendaDateFormat')}</span>
            </div>
          )
        },
        {
          title: 'Title',
          field: 'title',
        },
        {
          title: 'Task Type',
          field: 'taskType',
        },
        {
          title: 'Description',
          field: 'description',
        },
        {
          title: 'Status',
          field: 'status',
        },
        {
          title: 'Planned Cost',
          field: 'predictedCost',
        },

    ],
    []
  )

  let { messages } = localizer
  let end = dates.add(date, length, 'day')
  let range = dates.range(date, end, 'day')

  events = events.filter(event => inRange(event, date, end, accessors))
  events.sort((a, b) => +accessors.start(a) - +accessors.start(b))

  const { event: Event, date: AgendaDate } = components
  return (
    <div className="rbc-agenda-view">
      {events.length !== 0 ? (
        <React.Fragment>
          <CalendarTable
            columns={columns}
            data={events}
            {...props}
          />          
        </React.Fragment>
      ) : (
        <span className="rbc-agenda-empty">{messages.noEventsInRange}</span>
      )}
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