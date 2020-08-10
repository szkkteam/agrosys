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

//import { SubmitButton } from 'components/Form'

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
                    title: "1st event",
                    id: 1,
                },
                {
                    startDate: moment().add(3, "days").toDate(),
                    endDate: moment().add(5, "days").toDate(),
                    title: "2nd event",
                    id: 2,
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

    onEventResize = (data) => {
        console.log("onEventResize Data: ", data)
        const { start, end } = data;
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
        let items = [...this.state.tasks]
        let currentIdx = items.findIndex(e => e.startDate == data.event.startDate && e.endDate == data.event.endDate && e.title == data.event.title)
        let current = {...items[currentIdx]}
        current.startDate = start
        current.endDate = end
        items[currentIdx] = current
        this.setState({tasks: items})
      }
    
      onEventDrop = (data) => {
        console.log("onEventResize Data: ", data);
        const { start, end } = data;
    
        let items = [...this.state.tasks]
        let currentIdx = items.findIndex(e => e.startDate == data.event.startDate && e.endDate == data.event.endDate && e.title == data.event.title)
        let current = {...items[currentIdx]}
        current.startDate = start
        current.endDate = end
        items[currentIdx] = current
        this.setState({tasks: items})
      }

    render() {
        const { tasks, openDialog, selectedDate } = this.state
        return (
            <div>
            <ProductionTaskCalendar
                events={tasks}
                onEventDrop={this.onEventDrop}
                onEventResize={this.onEventResize}
                onSelectEvent={event => alert(event.title)}
                onSelectSlot={this.handleSelect}
                startAccessor={(e) => e.startDate }
                endAccessor={(e) => e.endDate }
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