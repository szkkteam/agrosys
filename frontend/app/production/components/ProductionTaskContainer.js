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
    SubmitButton,
} from 'production/components'

import { 
    Calendar,
} from 'components/Calendar'

//import { SubmitButton } from 'components/Form'

export default class ProductionTaskContainer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            openDialog: false,
            selectedDate: null,            
        }
    }
   
    handleSelect = ({ start, end }) => {
        //const title = window.prompt('New Event name')
        this.setState({
            selectedDate: {
                startDate: start,
                endDate: end,
            },
            openDialog: true,
        })        
      }

      
    onClose = (e) => {
        this.setState({
            openDialog: false,
        })
    }

    onSave = (value) => {
        const { onTaskAdded } = this.props
        console.log(value)
        this.setState({
            openDialog: false,
        })
        onTaskAdded && onTaskAdded(value)
    }

    
    onResize = (data) => {
        const { onTaskResize } = this.props
        const { start, end, event } = data;        
        onTaskResize && onTaskResize({ startDate: start, endDate: end}, event)
    }
    
    onDragNDrop = (data) => {
        const { onTaskDragNDrop } = this.props
        const { start, end, event } = data;
        onTaskDragNDrop && onTaskDragNDrop({ startDate: start, endDate: end}, event)
    }


    render() {
        const { 
            tasks,

            onTaskUpdate,
        } = this.props
        const { openDialog, selectedDate } = this.state
        return (
            <div>
            <Calendar
                events={tasks}
                onEventDrop={this.onDragNDrop}
                onEventResize={this.onResize}
                onSelectEvent={event => alert(event.title)}
                onSelectSlot={this.handleSelect}
                startAccessor={(e) => e.startDate }
                endAccessor={(e) => e.endDate }
                tableProps={{
                    options: {
                        //selection: true,
                    },
                    editable: {
                        onBulkUpdate: () => null,
                        onRowUpdate: (newData, oldData) => 
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    {
                                        onTaskUpdate && onTaskUpdate(newData, oldData)                                                
                                    }                                    
                                    resolve()
                                }, 1000)
                            })
                    }
                }}
            />
            { openDialog &&
                <Dialog open={openDialog} onClose={this.onClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
                    <DialogContent>
                        <FormTaskCreate
                            {...selectedDate}
                            onSubmit={this.onSave}
                        />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.onClose} color="primary">
                        Cancel
                    </Button>
                    <SubmitButton 
                        color="primary"
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