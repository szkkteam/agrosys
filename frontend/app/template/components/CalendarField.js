import React from 'react'
import TextField from "@material-ui/core/TextField";
import { DatePicker } from "@material-ui/pickers";

import moment from 'moment'

import {
    TaskCalendar
} from 'task/components'

export default ({
    tasks = [],
    change,
}) => {
    const [currentYear, setNewYear] = React.useState(new Date());

    const onEdit = (newData) => {
        const idx = _.findIndex(tasks, {id: newData.id})
        const newTasks = tasks.slice()
        newTasks[idx] = newData
        change('tasks', newTasks)
    }

    const onAdd = (newData) => {        
        change('tasks', _.concat(tasks, newData))
    }

    const onDelete = (oldData) => {
        change('tasks', tasks.filter(e => e.id !== oldData.id))
    }

    const onYearChange = (newYear) => {
        const newYearInt = newYear.get('year')
        const adjustedTasks = tasks.map((task, i) => {
            const startDate = moment(task.dates.startDate).year(newYearInt).toDate()
            const endDate = moment(task.dates.endDate).year(newYearInt).toDate()
            return {
                ...task,
                dates: {
                    startDate,
                    endDate,
                }
            }
        })
        change('tasks', adjustedTasks)
        setNewYear(newYear)
    }

    return (
        <React.Fragment>
            <TaskCalendar
                assignId={true}
                tasks={tasks}
                onAdd={onAdd}
                onEdit={onEdit}
                onDelete={onDelete}
            >
                <DatePicker
                    views={["year"]}
                    label="Adjust starting year"
                    value={currentYear}
                    onChange={onYearChange}
                    renderInput={(props) => <TextField {...props} />}
                />
            </TaskCalendar>
        </React.Fragment>

        
    )
}