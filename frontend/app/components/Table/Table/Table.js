import React, { useEffect, useContext, useState, useRef, useLayoutEffect } from 'react'
import PropTypes from 'prop-types'
//import messages from './messages';
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl';

import { useSplitComponents } from 'utils/hooks'
import { HeaderContentContext } from 'components'
import { useColumnFilter, useTableHeight } from '../hooks'

const TableContainer = styled.div`
    //height: 100%;
    padding: 15px 20px;
    background-color: #E0E0E0;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`

import {
    TableHeader,
    TableBody
} from '../../Table'

const Table = ({
    siblingRef=null,
    columns,
    children,
    ...props
}) => {
    // Store the ref to the outer div
    const parentRef = useRef(null)
    // Store the ref to the header
    const headerRef = useRef(null)

    const height = useTableHeight(headerRef, parentRef, siblingRef)
    
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
        ref: headerRef,
        columns: toggleColumns,
        onColumnChanged: setToggleColumns,        
    }

    const bodyProps = {
        height,
        columns: filteredColumns,
        ...props
    }

    return (
        <TableContainer 
            ref={parentRef}
        >
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
        </TableContainer>

    )

}

Table.propTypes = {
    //siblingRef: PropTypes.ref,
}

export default Table


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