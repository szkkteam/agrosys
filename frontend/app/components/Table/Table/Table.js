import React, { useEffect, useMemo, useState, useRef, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages';
import { FormattedMessage } from 'react-intl';

import './table.scss'

import {
    TableHeader,
    TableBody
} from '../../Table'

const Table = ({
    tableTitle,
    columns,
    ...props
}) => {
    // Store the ref to the outer div
    const parentRef = useRef(null)
    // Store the ref to the header
    const headerRef = useRef(null)
    
    const getColumnsVisibility = () => columns.map(col => ({ title: col.title, hidden: 'hidden' in col? col.hidden : false }))

    const [height, setHeight] = useState(700)

    const [toggleColumns, setToggleColumns] = useState(getColumnsVisibility())

    const filteredColumns = _.zip(columns, toggleColumns).map(mix => {
        const col = mix[0]
        const toggleCol = mix[1]

        return {
            ...col,
            hidden: toggleCol.hidden
        }
    })

    useLayoutEffect(() => {
        if (parentRef.current && headerRef.current) {
            setHeight(parentRef.current.clientHeight - headerRef.current.clientHeight)
        }
    }, [parentRef, headerRef])

    return (
        <div 
            ref={parentRef}
            className="table-main-container"
        >
            <TableHeader
                ref={headerRef}
                title={tableTitle}
                columns={toggleColumns}
                onColumnChanged={setToggleColumns}
            />
            <TableBody
                height={height}
                columns={filteredColumns}
                {...props}
            />
        </div>

    )

}

Table.propTypes = {
    tableTitle: PropTypes.object.isRequired,
}

export default Table