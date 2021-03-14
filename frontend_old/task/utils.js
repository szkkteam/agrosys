import moment from 'moment'

export const cleanTaskData = (task) => {
    const { tableData, id, ...taskData } = task
    return taskData
}

export const cleanTasks = (taskList) => {
    return taskList.map((task, i) => (
        cleanTaskData(task)
    ))
}


export const orderTasks = (tasks) => {
    const convertedTasks = convertToDateObject(tasks)
    return convertedTasks.sort((a, b) => +a.dates.startDate - +b.dates.endDate)
}


export const convertToDateObject = (tasks) => {
    return tasks.map((task, i) => {
        const startDate = moment(task.dates.startDate).toDate()
        const endDate = moment(task.dates.endDate).toDate()
        return {
            ...task,
            dates: {
                startDate,
                endDate,
            }
        }
    })
}