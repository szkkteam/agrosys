import React from 'react'


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

export default class TaskCalendar extends React.Component {

    constructor(props) {
        super(props) 

        this.state = {
            temporaryId: 1,
            dialogStatus: dialogStatusEnum.CLOSE,
            selectedTask: null,     
        }
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
        const { onAdd, assignId } = this.props
        const { temporaryId } = this.state
        const updatedValue = assignId? Object.assign(value, {id: temporaryId}) : value
        onAdd && onAdd(updatedValue)            
        this.setState({
            temporaryId: temporaryId + 1,
        })
    }

    render() {
        const {
            tasks = [],
            onAdd,
            onEdit,
            onDelete,
            onSelect,
            assignId = false, // If new task is created assign ID to it automatically
        } = this.props
        const { dialogStatus, selectedTask } = this.state

        return (
            <React.Fragment>
                <Calendar
                    events={tasks}
                    onSelectEvent={onSelect}
                    onDoubleClickEvent={this.onDoubleClick}

                    onSelectSlot={this.handleSelect}
                    onEventDrop={this.onDragNDrop}
                    onEventResize={this.onResize}
                    onTaskUpdate={this.onEdit}
                    onTaskDelete={onDelete}    
                    onTaskAdded={onAdd}

                    startAccessor={(e) => e.dates.startDate }
                    endAccessor={(e) => e.dates.endDate }
                />
                <ModalForm
                    open={dialogStatus !== dialogStatusEnum.CLOSE}
                    onClose={this.onCloseForm}
                    title={dialogStatus === dialogStatusEnum.OPEN_EDIT? "Task Edit": "Task Add"}
                    submitButtonProps={{
                        formName: "formTask"
                    }}
                >
                    <FormTaskDetail
                        initialValues={{...selectedTask}}
                        onSubmit={dialogStatus === dialogStatusEnum.OPEN_EDIT? this.onUpdateForm: this.onSaveForm}
                    />
                </ModalForm>
            </React.Fragment>
        )
    }
}