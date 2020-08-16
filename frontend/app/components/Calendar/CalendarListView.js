import PropTypes from 'prop-types'
import React, { useRef, useEffect } from 'react'
import moment from 'moment'

import TextField from "@material-ui/core/TextField";
import { DateRangePicker, DateRange, DateRangeDelimiter } from "@material-ui/pickers";

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

import { SelectComponent, SelectOption } from 'components/Form'

import { statusEnum, taskTypesEnum } from 'production/constants'


const renderItems = (items) => (
  items && Array.isArray(items) && items.map((item, index) => (
      <SelectOption 
          key={index} 
          value={item.id}
      >
          {item.title}
      </SelectOption>    
  ))
)

function CalendarListView({
  selected,
  getters,
  accessors,
  localizer,
  components,
  length,
  date,
  events,
  onTaskUpdate,
  onTaskDelete,
  onTaskAdded,
  ...props,
}) {
  const columns = React.useMemo(
    () => [
        {
          title: 'Start Date',
          field: 'dates',
          initialEditValue: [new Date(), new Date()],
          cellStyle: {whiteSpace: "nowrap"},
          customSort: (a, b) => +accessors.start(a) - +accessors.start(b),
          //type: 'datetime',
          render: (rowData) => (
            <div>
              <span>{localizer.format(accessors.start(rowData), 'agendaDateFormat')}</span>
              <span> - </span>
              <span>{localizer.format(accessors.end(rowData), 'agendaDateFormat')}</span>
            </div>
          ),
          editComponent: ({value, onChange}) => {
            console.log("Props: ", props)
            return (
              <DateRangePicker
                startText="Start"
                endText="End"
                value={[value.startDate, value.endDate]}
                onChange={(newValue) => onChange({startDate: moment(newValue[0]).toDate(), endDate: moment(newValue[1]).toDate()})}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField {...startProps} helperText="" />
                    <DateRangeDelimiter> to </DateRangeDelimiter>
                    <TextField {...endProps} helperText=""/>
                  </React.Fragment>
                )}
              />
            )
          },
        },
        {
          title: 'Title',
          field: 'title',
        },
        {
          
          title: 'Task Type',
          field: 'taskType',
          initialEditValue: "TaskGeneral",
          editComponent: ({value, onChange}) => (
            <SelectComponent
                helper="Helper"
                value={value}
                onChange={e => onChange(e.target.value)}
                >
                    { renderItems(taskTypesEnum) }
            </SelectComponent>
          )
        },
        {
          title: 'Description',
          field: 'description',
        },
        {
          title: 'Status',
          field: 'status',
          initialEditValue: "Pending",
          editComponent: (props) => (
            <SelectComponent
                helper="Helper"
                value={props.value}
                onChange={e => props.onChange(e.target.value)}
                >
                    { renderItems(statusEnum) }
            </SelectComponent>
          )
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
        <CalendarTable
          columns={columns}
          data={events}
          editable={{                
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