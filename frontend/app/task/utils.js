export const cleanTaskData = (task) => {
    const { tableData, ...taskData } = task
    return taskData
}

export const cleanTasks = (taskList) => {
    return taskList.map((task, i) => (
        cleanTaskData(task)
    ))
}