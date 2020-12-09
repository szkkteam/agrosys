import React, { useEffect, useContext, useState, useRef, useMemo, forwardRef } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages';
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl';

import { useSplitComponents } from 'utils/hooks'
import { HeaderContentContext } from 'components'
import { useColumnFilter, useTableHeight } from '../hooks'

const topBottomPadding = 15;

const TableContainer = styled.div`
    //height: 100%;
    padding: ${topBottomPadding}px 20px;
    background-color: #E0E0E0;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`

import {
    TableContext,
    TableBody
} from '../../Table'

const Table = forwardRef(({
    siblingRef=null,
    columns,
    children,
    ...props
}, ref) => {
    // Store the ref to the outer div
    const parentRef = useRef(null)
    // Store the ref to the header
    //const headerRef = useRef(null)

    //const height = useTableHeight(headerRef, parentRef, siblingRef)
    

    const {
        componentA: tableHeaderComponent,
        componentB: tableBodyComponent
    } = useSplitComponents(children)

    const {
        toggleColumns,
        setToggleColumns,
        filteredColumns
    } = useColumnFilter(columns)
    
    const headerProps = {
        //ref: headerRef,
        columns: toggleColumns,
        onColumnChanged: setToggleColumns,  
    }

    const bodyProps = {
        //height,
        columns: filteredColumns,
    }

    const value = useMemo(() => ({

        //ref: headerRef,
        toggleColumns: toggleColumns,
        onColumnChanged: setToggleColumns,   
        //height,
        topBottomPadding,
        columns: filteredColumns,
        
    }), [columns])

    return (
        <TableContainer 
            ref={ref}
        >
            <TableContext.Provider value={value}>
                {children}
            </TableContext.Provider>
        </TableContainer>

    )

})

Table.propTypes = {
    //siblingRef: PropTypes.ref,
}

export default Table
/*

*/

/*
            {_.isFunction(tableHeaderComponent)? 
                    tableHeaderComponent(headerProps)
                    : 
                    React.cloneElement(tableHeaderComponent, headerProps)
                }
                {_.isFunction(tableBodyComponent)? 
                    tableHeaderComponent(bodyProps)
                    : 
                    React.cloneElement(tableBodyComponent, bodyProps)
                }                
*/