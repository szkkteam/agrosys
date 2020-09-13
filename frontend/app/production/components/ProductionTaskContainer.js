import React from 'react'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { 
    ProductionTaskCalendar,
    FormTaskCreate,
} from 'production/components'

import {
    SubmitButton,
} from 'components/Form'

import { 
    Calendar,
} from 'components/Calendar'

//import { SubmitButton } from 'components/Form'

const dialogStatusEnum = {
    CLOSE: "close",
    OPEN_ADD: "open add",
    OPEN_EDIT: "open edit",
}

export default class ProductionTaskContainer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            dialogStatus: dialogStatusEnum.CLOSE,
            selectedTask: null,            
        }
    }
   
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

      
    onClose = (e) => {
        this.setState({
            dialogStatus: dialogStatusEnum.CLOSE,
        })
    }

    onSave = (value) => {
        const { onTaskAdded } = this.props
        onTaskAdded && onTaskAdded(value)
        this.setState({
            dialogStatus: dialogStatusEnum.CLOSE,
        })
    }

    onUpdate = (value) => {
        const { onTaskUpdate } = this.props
        const { selectedTask } = this.state 
        onTaskUpdate && onTaskUpdate(value, selectedTask)    
        this.setState({
            dialogStatus: dialogStatusEnum.CLOSE,
        })
    }

    
    onResize = (data) => {
        const { onTaskResize } = this.props
        const { start, end, event } = data;        
        onTaskResize && onTaskResize({...event, ... {dates: { startDate: start, endDate: end}}}, event)
    }
    
    onDragNDrop = (data) => {
        const { onTaskDragNDrop } = this.props
        const { start, end, event } = data;
        onTaskDragNDrop && onTaskDragNDrop({...event ,... {dates: { startDate: start, endDate: end}}}, event)
    }

    onDoubleClick = (data) => {
        const { onTaskSelect } = this.props
        this.setState({
            selectedTask: {
                ...data,
            },
            dialogStatus: dialogStatusEnum.OPEN_EDIT,
        })   
        //onTaskSelect && onTaskSelect(data)
    }

    render() {
        const { 
            tasks,
            onTaskSelect,
            onTaskUpdate,
            onTaskDelete,
            onTaskAdded,
        } = this.props
        const { dialogStatus, selectedTask } = this.state
        
        return (
            <div>
            <Calendar
                events={tasks}
                onSelectEvent={onTaskSelect}
                onDoubleClickEvent={this.onDoubleClick}

                onSelectSlot={this.handleSelect}
                onEventDrop={this.onDragNDrop}
                onEventResize={this.onResize}
                onTaskUpdate={onTaskUpdate}
                onTaskDelete={onTaskDelete}    
                onTaskAdded={onTaskAdded}

                startAccessor={(e) => e.dates.startDate }
                endAccessor={(e) => e.dates.endDate }
            />
            { true &&
                <Dialog open={dialogStatus !== dialogStatusEnum.CLOSE} onClose={this.onClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">
                        {dialogStatus === dialogStatusEnum.OPEN_EDIT? "Task Edit": "Task Add"}
                    </DialogTitle>
                    <DialogContent>
                        <FormTaskCreate
                            initialValues={{...selectedTask}}
                            onSubmit={dialogStatus === dialogStatusEnum.OPEN_EDIT? this.onUpdate: this.onSave}
                        />
                    </DialogContent>
                    <DialogActions>
                    <Button 
                        onClick={this.onClose} 
                        color="primary"
                        variant="contained"
                    >
                        Cancel
                    </Button>
                    <SubmitButton 
                        color="primary"
                        variant="contained"
                        formName="create-task"
                    >
                        Save
                    </SubmitButton>
                    </DialogActions>
                </Dialog>

            }
            </div>
        )
    }
}