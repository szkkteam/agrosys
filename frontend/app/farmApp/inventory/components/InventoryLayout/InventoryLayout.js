import React, { useContext, useMemo, useState, forwardRef, useLayoutEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import styled from 'styled-components'
import { useIntl, FormattedMessage } from 'react-intl'

import { 
    MasterDetail,
} from 'components'

import { 
    Table,
    TableHeader,
    TableBody
} from 'components/Table'

import { 
    Grid,
    Typography
}  from '@material-ui/core';


const columns = [
    { title: 'Name', field: 'title'},
    { title: 'Active', field: 'isActive', type: 'boolean'},
    //{ title: 'Address', field: 'address', hidden: true}
]

const TableSubHeader = styled(Typography)`
    border-bottom: 2px solid black;
    margin: 10px 0;
`

/*

*/

const DetailPanel = ({
    height,
    columns,
}) => {

    const titleRef = useRef(null)
    const [adjustedHeight, setAdjustedHeight] = useState(height)

    console.debug("original height: ", height)
    console.debug("adjustedHeight: ", adjustedHeight)

    useLayoutEffect(() => {
        if (titleRef.current) {
            const { clientHeight } = titleRef.current

            setAdjustedHeight(height - clientHeight - 20)
        }
    }, [titleRef, height])

    return (
        <>
            <TableSubHeader
                ref={titleRef}
                variant="h4"
            >
                Items - Bin 1
            </TableSubHeader>
            <TableBody
                height={adjustedHeight}
                columns={columns}
            />
        </>
    )
}

const Body = ({
    height,
    columns,
}) => {
    return (
        <MasterDetail
        >
            <div>Master</div>
            <DetailPanel
                height={height}
                columns={columns}
            />
        </MasterDetail>
    )
}

const InventoryLayout = ({
    
}) => {
    return (
        <Table
            columns={columns}
        >
            <TableHeader 
                title={messages.title}
            />
            <Body />
        </Table>
    )
}

InventoryLayout.propTypes = {

}

export default InventoryLayout