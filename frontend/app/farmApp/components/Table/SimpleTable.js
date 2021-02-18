import React, { useContext, useMemo, useState } from 'react'
import globalMessages from 'messages'
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import { useHistory, useLocation } from "react-router-dom";
import styled from 'styled-components'

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core'

const renderRows = ({data, columns, ...props}) => (
    data && data.map((row, i) => (
        <TableRow key={i}>
            { columns && columns.map(({render, accessor, cellProps={}}, j) => (
                <TableCell key={`row-${i}-col${j}`} {...cellProps}>
                    {render? (
                        render(row, i, props)
                    ) : (
                        row[accessor]
                    )}
                </TableCell>                                    
            ))}
        </TableRow>
    ))
)

const SimpleTable = ({
    className,
    columns,
    render,
    data,
    ...props
}) => {
    return (
        <TableContainer>
            <Table className={className}>
                <TableHead>
                    <TableRow>
                        {columns && columns.map(({title="", headerCellProps={}}, i) => (
                            <TableCell key={i} {...headerCellProps}>{title}</TableCell>
                        ))}                       
                    </TableRow>
                </TableHead>
                <TableBody>
                    {render? (
                        render({data, columns, ...props})
                    ): (
                        renderRows({data, columns, ...props})
                    )}                                      
                </TableBody>
            </Table>
        </TableContainer>            
    )
}

SimpleTable.propTypes = {

}

SimpleTable.renderRows = renderRows


export default SimpleTable