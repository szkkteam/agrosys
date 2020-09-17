import React from 'react'
import moment from 'moment'

import TextField from "@material-ui/core/TextField";
import { DateRangePicker, DateRange, DateRangeDelimiter } from "@material-ui/pickers";
import { SelectComponent, SelectOption } from 'components/Form'
import { statusEnum, taskTypesEnum } from 'task/constants'

import { 
    Calendar,
} from 'components/Calendar'

import {
    FormTaskDetail
} from 'task/components'

import { ModalForm } from 'components/Form'

const dialogStatusEnum = {
    CLOSE: "close",
    OPEN_ADD: "open add",
    OPEN_EDIT: "open edit",
}



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

const columns = [
        {
          title: 'Start Date',
          field: 'dates',
          initialEditValue: [new Date(), new Date()],
          cellStyle: {whiteSpace: "nowrap"},
          customSort: (a, b) => +a.dates.startDate - +b.dates.startDate,
          //type: 'datetime',
          render: (rowData) => (
            <div>
              <span>{moment(rowData.dates.startDate).format('YYYY, MM DD')}</span>
              <span> - </span>
              <span>{moment(rowData.dates.endDate).format('YYYY, MM DD')}</span>
            </div>
          ),
          editComponent: ({value, onChange}) => {
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

]


export default class TaskCalendar extends React.Component {

    constructor(props) {
        super(props) 

        this.state = {
            temporaryId: 1,
            dialogStatus: dialogStatusEnum.CLOSE,
            selectedTask: null,     
        }
    }

    static defaultProps = {
        disabled: false,
        tasks: [],
        assignId: false,
      }

    /**
     * Form control callbacks
     */
    onCloseForm = (e) => {
        this.setState({
            dialogStatus: dialogStatusEnum.CLOSE,
        })
    }

    onSaveForm = (value) => {
        const { onAdd, assignId } = this.props
        const { temporaryId } = this.state
        console.log("onSaveForm-value: ", value)
        const updatedValue = assignId? Object.assign(value, {id: temporaryId}) : value
        onAdd && onAdd(updatedValue)            
        this.setState({
            dialogStatus: dialogStatusEnum.CLOSE,
            temporaryId: temporaryId + 1,
        })
    }

    onUpdateForm = (value) => {
        const { onEdit } = this.props
        onEdit && onEdit(value)    
        this.setState({
            dialogStatus: dialogStatusEnum.CLOSE,
        })
    }
    
    /**
     * Calendar control callbacks
     */
    handleSelect = ({ start, end }) => {
        //const title = window.prompt('New Event name')
        this.setState({
            selectedTask: {
                dates: {
                    startDate: start,
                    endDate: end,
                },
            },
            dialogStatus: dialogStatusEnum.OPEN_ADD,
        })        
      }

    onResize = (data) => {
        const { onEdit } = this.props
        const { start, end, event } = data;        
        onEdit && onEdit({...event, ... {dates: { startDate: start, endDate: end}}})
    }
    
    onDragNDrop = (data) => {
        const { onEdit } = this.props
        const { start, end, event } = data;
        onEdit && onEdit({...event ,... {dates: { startDate: start, endDate: end}}})
    }

    onDoubleClick = (data) => {
        this.setState({
            selectedTask: {
                ...data,
            },
            dialogStatus: dialogStatusEnum.OPEN_EDIT,
        })   
    }

    /**
     * Calendar - List control callbacks
     */
    onEdit = (newData, oldData) => {
        const { onEdit } = this.props
        onEdit && onEdit(newData)
    }

    onEventAdd = (value) => {
        const { onAdd, assignId, disable } = this.props
        const { temporaryId } = this.state
        const updatedValue = assignId? Object.assign(value, {id: temporaryId}) : value
        onAdd && onAdd(updatedValue)            
        this.setState({
            temporaryId: temporaryId + 1,
        })
    }

    render() {
        const {
            disabled,
            tasks,
            onAdd,            
            onEdit,
            onDelete,
            onSelect,
            assignId = false, // If new task is created assign ID to it automatically
            children,
        } = this.props
        const { dialogStatus, selectedTask } = this.state
        console.log("disabled: ", disabled)
        return (
            <React.Fragment>
                <Calendar
                    disabled={disabled}
                    events={tasks}
                    columns={columns}
                    onSelectEvent={onSelect}
                    onDoubleClickEvent={!disabled? this.onDoubleClick: undefined}

                    onSelectSlot={!disabled? this.handleSelect: undefined}
                    onEventDrop={!disabled? this.onDragNDrop: undefined}
                    onEventResize={!disabled? this.onResize: undefined}
                    onTaskUpdate={!disabled? this.onEdit: undefined}
                    onTaskDelete={!disabled? onDelete: undefined}    
                    onTaskAdded={!disabled? onAdd: undefined}

                    startAccessor={(e) => e.dates.startDate }
                    endAccessor={(e) => e.dates.endDate }
                >
                    {children}
                </Calendar>
                <ModalForm
                    open={dialogStatus !== dialogStatusEnum.CLOSE}
                    onClose={this.onCloseForm}
                    title={dialogStatus === dialogStatusEnum.OPEN_EDIT? "Task Edit": "Task Add"}
                    submitButtonProps={{
                        formName: "formTask"
                    }}
                >
                    <FormTaskDetail
                        canChangeTaskType={dialogStatus === dialogStatusEnum.OPEN_ADD}
                        initialValues={{...selectedTask}}
                        onSubmit={dialogStatus === dialogStatusEnum.OPEN_EDIT? this.onUpdateForm: this.onSaveForm}
                    />
                </ModalForm>
            </React.Fragment>
        )
    }
}