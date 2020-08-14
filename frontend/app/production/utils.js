
export const tasksToString = (task) => {
    let tmp = []
    for (var i = 0; i < task.length; ++i ){
        tmp.push(JSON.parse(JSON.stringify(task[i])))
        /*
        console.log("startDate: ", obj)
        obj.startDate = formatISO(taks[i].startDate)
        obj.endDate = formatISO(taks[i].endDate)
        tmp.push(obj)
        */
    }
    return tmp
}


export const tasksFromString = (task) => {
    let tmp = []
    for (var i = 0; i < task.length; ++i ){

        let obj = JSON.parse(JSON.stringify(task[i])) 
        {
            let date = new Date(obj.startDate) 
            date.setDate(date.getDate());
            obj.startDate = date
        }
        {
            let date = new Date(obj.endDate) 
            date.setDate(date.getDate());
            obj.endDate = date
        }

        for (const [key, value] of Object.entries(obj)) {
            if (obj[key] == null)  {
                delete obj[key]
            }
          }

        tmp.push(obj)
        /*
        console.log("startDate: ", obj)
        obj.startDate = formatISO(taks[i].startDate)
        obj.endDate = formatISO(taks[i].endDate)
        tmp.push(obj)
        */
    }
    return tmp
}
