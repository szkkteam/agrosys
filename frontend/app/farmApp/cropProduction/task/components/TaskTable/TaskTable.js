import React, { useState, useRef, useLayoutEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'

import { 
    Table,
    TableHeader,
    TableBody
} from 'components/Table'

import { useHeightDifference } from 'utils/hooks'

const data = [
    
]

const TaskTable = ({
    height: parentHeight,
    ...props
}) => {
    const intl = useIntl()

    const headerRef = useRef(null)

    const columns = [
        { title: 'Event', field: 'title'},
        { title: 'Type', field: 'type'},
        { title: 'Start', field: 'startDate'},
        { title: 'Days', field: 'days' },
        { title: 'Status', field: 'status' }
    ]

    return (
            <TableBody
                columns={columns}
                height={parentHeight}
                data={data}
                {...props}
            />
    )
}

TaskTable.propTypes = {

}

export default TaskTable
