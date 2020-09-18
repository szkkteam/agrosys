import React from 'react'
import TextField from "@material-ui/core/TextField";
import { DatePicker } from "@material-ui/pickers";

import {
    TaskCalendar
} from 'task/components'

import {
    adjustTasksYear
} from 'template/utils'

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
        const adjustedTasks = adjustTasksYear(tasks, newYear)
        change('tasks', adjustedTasks)
        setNewYear(newYear)
    }

    console.log("Tasks: ", tasks)

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