import React from 'react'

export default ({event}) => {
    console.log("Event: ", event)
    return (
        <h1>
            {event.title}
        </h1>
    )
}

