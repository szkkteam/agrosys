import React, { useState, useRef, useLayoutEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { PrimaryActionButton } from 'components'

import {
    Grid
} from '@material-ui/core'

import { 
    Table,
    TableHeader,
    TableBody
} from 'components/Table'

import { useHeightDifference } from 'utils/hooks'

const FlexGrid = styled(Grid)`
    display: flex;
`

const Spacer = styled.div`
    flex-grow: 1;
`

const data = [
    { title: 'Manager', isActive: true },
    { title: 'Admin', isActive: true },
    { title: 'Operator', isActive: true },
    { title: 'Old role', isActive: false },
]

const ReservationTable = ({
    height: parentHeight,
    ...props
}) => {
    const intl = useIntl()

    const headerRef = useRef(null)
    const height = useHeightDifference(parentHeight, headerRef, 542)


    const columns = [
        { title: 'Name', field: 'title'},
        { title: 'Active', field: 'isActive', type: 'boolean'},
        //{ title: 'Address', field: 'address', hidden: true}
    ]

    return (
            <Table
                columns={columns}
            >
                <TableHeader
                    ref={headerRef}
                    title={messages.tableTitle}
                    gridProps={{
                        justify: "flex-end",
                    }}
                >   
                    <Grid
                        container
                        justify="flex-end"
                    >
                        <FlexGrid item xs={9}>
                            <Spacer />
                            <PrimaryActionButton
                                title={messages.addNewTitle}
                            />
                        </FlexGrid>
                        <Grid item xs={3}>                            
                        </Grid>
                    </Grid>
                </TableHeader>
                <TableBody
                    height={height}
                    data={data}
                    {...props}
                />
            </Table>
    )
}

ReservationTable.propTypes = {

}

export default ReservationTable
