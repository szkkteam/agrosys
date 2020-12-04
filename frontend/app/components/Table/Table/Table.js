import React, { useEffect, useContext, useState, useRef, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages';
import { FormattedMessage } from 'react-intl';

import { HeaderContentContext } from 'components'
import { useWindowSize } from 'utils/hooks'
import useColumnFilter from './useColumnFilter'

import './table.scss'

import {
    TableHeader,
    TableBody
} from '../../Table'

const Table = ({
    siblingRef=null,
    tableTitle,
    columns,
    ...props
}) => {
    // Store the ref to the outer div
    const parentRef = useRef(null)
    // Store the ref to the header
    const headerRef = useRef(null)

    const [height, setHeight] = useState(580)

    const { contentHeight } = useContext(HeaderContentContext)

    const {
        toggleColumns,
        setToggleColumns,
        filteredColumns
    } = useColumnFilter(columns)
    
    useLayoutEffect(() => {
        if (headerRef.current) {
            const { clientHeight } = headerRef.current

            setHeight(contentHeight - clientHeight - (siblingRef?.current?.clientHeight ?? 0) - 30)
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
    //siblingRef: PropTypes.ref,
}

export default Table