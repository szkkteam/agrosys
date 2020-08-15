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
  accessors,
  localizer,
  start,
  end,
  events,  
  tableProps,
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

  events = events.filter(event => inRange(event, start, end, accessors))
  events.sort((a, b) => +accessors.start(a) - +accessors.start(b))
  return (
    <div className="rbc-agenda-view">
      {events.length !== 0 ? (
        <React.Fragment>
          <CalendarTable
            columns={columns}
            data={events}
            {...tableProps}
          />          
        </React.Fragment>
      ) : (
        <span className="rbc-agenda-empty">No events in range</span>
      )}
    </div>
  )
}

CalendarListView.propTypes = {
  events: PropTypes.array,
  localizer: PropTypes.object.isRequired,
}

CalendarListView.title = (start, { length = Agenda.defaultProps.length, localizer }) => {
  console.log("CalendarListView.title: ", start)
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