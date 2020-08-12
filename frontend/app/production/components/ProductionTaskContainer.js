import React from 'react'
import moment from "moment";

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

const findTaskIdInlist = (list, data) => {
    return list.findIndex(e => {
        //console.log("e: ", e)
        return e.startDate == data.startDate && e.endDate == data.endDate && e.title == data.title
    }
    )
}

const updateListElements = (list, data, findData = null) => {
    //console.log("List: ", list)
    //console.log("data: ", data)
    //console.log("findData: ", findData)
            /*
        this.setState(({items}) => ({
            items: [
                ...items.slice(0,1),
                {
                    ...items[1],
                    name: 'newName',
                },
                ...items.slice(2)
            ]
        }));
        */
    let items = [...list]
    let currentIdx = findTaskIdInlist(items, (findData === null || findData === undefined)? data: findData)
    let current = {...items[currentIdx]}
    // Update each element
    for (const [key, value] of Object.entries(data)) {
        current[key] = value
      }
    items[currentIdx] = current
    return items
}

export default class ProductionTaskContainer extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            openDialog: false,
            selectedDate: null,
            tasks: [
                {
                    startDate: moment().toDate(),
                    endDate: moment().add(1, "days").toDate(),
                    title: "Task for pruning",
                    taskType: 'TaskPruning',
                    description: "Some random text for this task",
                    status: "Pending",
                    plannedCost: 1234,
                },
                {
                    startDate: moment().add(3, "days").toDate(),
                    endDate: moment().add(5, "days").toDate(),
                    title: "Typical generic task",
                    taskType: 'TaskGeneral',
                    description: "Some random text for this task",
                    status: "Pending",
                    plannedCost: 6789,
                },
            ],
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
        /*
        if (title)
          this.setState({
            tasks: [
              ...this.state.tasks,
              {
                startDate: start,
                endDate: end,
                title,
              },
            ],
          })
          */
      }

    onClose = (e) => {
        this.setState({
            openDialog: false,
        })
    }

    onSave = (value) => {
        console.log(value)
        this.setState({
            openDialog: false,
        })
    }

    onUpdate = (newData, oldData) => {
        console.log("newData: ", newData)
        console.log("oldData: ", oldData)
        this.setState({tasks: updateListElements(this.state.tasks, newData, oldData)})
    }

    onEventResize = (data) => {
        console.log("onEventResize Data: ", data)
        const { start, end, event } = data;        
        this.setState({tasks: updateListElements(this.state.tasks, {startDate: start, endDate: end}, event)})
      }
    
      onEventDrop = (data) => {
        console.log("onEventResize Data: ", data);
        const { start, end, event } = data;
        this.setState({tasks: updateListElements(this.state.tasks, {startDate: start, endDate: end}, event)})
      }

    render() {
        const { tasks, openDialog, selectedDate } = this.state
        return (
            <div>
            <Calendar
                events={tasks}
                onEventDrop={this.onEventDrop}
                onEventResize={this.onEventResize}
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
                                        this.onUpdate(newData, oldData)                                                
                                    }                                    
                                    resolve()
                                }, 1000)
                            })
                    }
                }}
            />
            { openDialog &&
                <Dialog open={openDialog} onClose={this.onDialogClose} aria-labelledby="form-dialog-title">
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