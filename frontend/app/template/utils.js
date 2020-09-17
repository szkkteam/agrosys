import moment from 'moment'

export const adjustTasksYear = (tasks, newYear = moment()) => {
    const newYearInt = newYear.get('year')
    return tasks.map((task, i) => {
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