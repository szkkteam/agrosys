import React, { useState, useRef, useLayoutEffect, useEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { TableBase } from 'components/Table'
import { 
    Table,
    TableHeader,
    TableBody
} from 'components/Table'

import {
    Grid
} from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete';

import { PLAN_FORM_NAME } from '../../constants'
import { getProductionsFromForm } from '../../selectors'

const TableContainer = styled.div`
    //width: 50%;
    padding: 0 10px;
`

const FlexGrid = styled(Grid)`
    display: flex;
`

const Spacer = styled.div`
    flex-grow: 1;
`


const PlanSummaryTable = ({
    onOpenProduction,
    onDeleteProduction,
    children,
    //data,
}) => {
    const productions = useSelector(getProductionsFromForm)
    console.debug("Productions selector: ", productions)

    const columns = [
        {title: 'Crop', field: 'crop',},
        {title: 'Planned yield', field: 'yield'},        
        {title: 'Type', field: 'type'},
        {title: 'Period', field: 'period'},
        {title: 'Fields size', field: 'size'},
        {title: 'Number of tasks', field: 'tasks'},
    ]

    const handleClick = (e, data) => {
        const { production, tableData: { id } } = data
        onOpenProduction && onOpenProduction(production, id)
    }

    const handleDelete = (e, data) => {
        const { production, tableData: { id } } = data
        onDeleteProduction && onDeleteProduction(production, id)
    }

    return (
        <TableContainer>
            <TableHeader
                title={messages.title}
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
                        {children}
                    </FlexGrid>
                    <Grid item xs={3}>                            
                    </Grid>
                </Grid>
            </TableHeader>
            <TableBody
                //height={height}
                columns={columns}
                data={productions}
                onRowClick={handleClick}
                actions={[
                    rowData => ({
                        icon: DeleteIcon,
                        tooltip: 'Delete production',
                        onClick: handleDelete,
                    })
                ]}
                components={{
                    Toolbar: () => null,
                }}
            />
        </TableContainer>
        
    )
}

PlanSummaryTable.propTypes = {

}

/*
<TableBase
            title="Productions in this season"
            columns={columns}
            data={productions}
            onRowClick={handleClick}
            options={{
                emptyRowsWhenPaging: true,
                paging: false, // By default remove paging
                actionsColumnIndex: -1
            }}
            actions={[
                rowData => ({
                  icon: DeleteIcon,
                  tooltip: 'Delete production',
                  onClick: handleDelete,
                })
              ]}
            components={{
                Container: (props) => <TableContainer {...props}/>,
            }}
        />
*/

export default PlanSummaryTable