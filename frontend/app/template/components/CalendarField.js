import React from 'react'

import {
    TaskCalendar
} from 'task/components'

export default ({
    tasks = [],
    change,
}) => {

    const onEdit = (newData) => {
        const idx = _.findIndex(tasks, {id: newData.id})
        console.log("onEdit-newData: ", newData)
        console.log("onEdit-idx: ", idx)
        console.log("onEdit-splice: ", tasks.splice(idx, 1, newData))
        change('tasks', tasks.splice(idx, 1, newData))
    }

    const onAdd = (newData) => {
        
        change('tasks', _.concat(tasks, newData))
    }

    const onDelete = (oldData) => {
        change('tasks', tasks.filter(e => e.id !== oldData.id))
    }

    return (
        <TaskCalendar
            assignId={true}
            tasks={tasks}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
        />
    )
}