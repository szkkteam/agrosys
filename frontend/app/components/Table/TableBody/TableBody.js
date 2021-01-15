import React, { useRef, useMemo } from 'react'
import messages from './messages'
import { forwardRef } from 'react';
import styled from 'styled-components'

import MaterialTable from 'material-table';

import MoreVertIcon from '@material-ui/icons/MoreVert';

import { useTableContext } from '../hooks'
import { useHeightDifference } from 'utils/hooks'

import TableToolbar from '../TableToolbar'
import TableAction from './TableAction'
import { ItemMenu } from 'components'

import TableBase from '../TableBase'

import './tablebody.scss'
import { object } from 'prop-types';

const CenteredItemMenu = styled(props => <ItemMenu {...props} />)`
    margin: 0 auto;
`

export default ({
    columns,
    height,
    options={},
    actionItems,
    components={},
    cellEditable = null,
    onCellEditStarted = null,
    onCellEditFinished = null,
    ...props
}) => {
    const toolbarRef = useRef(null)

    const {
        topBottomPadding,
    } = useTableContext()

    const bodyHeight = useHeightDifference(height - topBottomPadding, toolbarRef)
    //console.debug("bodyHeight: ", bodyHeight)

    const actions = [
        rowData => {
            return ({
                icon: MoreVertIcon,
                component: (props) => <CenteredItemMenu icon={MoreVertIcon} items={actionItems} data={rowData} {...props}/>,
                tooltip: 'Show actions',          
            })
        }
    ]


    const defaultOptions = {
        ...Object.assign(options, {
            emptyRowsWhenPaging: true,
            //toolbar: false, // By default remove toolbar
            paging: false, // By default remove paging
            maxBodyHeight: bodyHeight, // By default set height
            minBodyHeight: bodyHeight - 1, // By default set height
            headerStyle: { 
                position: 'sticky',
                top: 0,
                //backgroundColor: "#E0E0E0",
                //borderBottom: "2px solid",
                boxShadow: "inset 0 -2px 0 black",
            }, // By default sticky header
            columnsButton: true,
            actionsColumnIndex: -1,
        })
    } 

    const defaultComponents = {
        ...{
            Toolbar: props => (
                <TableToolbar ref={toolbarRef} {...props} myProps={1}/>
            ),
            Action: TableAction,
            //Actions: (props) => <ItemMenu items={items} />
        }, ...components
    }

    return (
        <TableBase
            columns={columns}
            actions={actionItems? actions: null}
            options={defaultOptions}
            style={{
                //backgroundColor: "#E0E0E0",
                borderRadius: "initial",
                boxShadow: "initial",
                width: "100%",
            }}            
            components={defaultComponents}
            {...props}
        />
    )
}


/*
    TODO: This renders a column with an action. Not the best
    const extendedColumns = useMemo(() => {
        const actionColumn = [
            {
                render: (rowData) => (
                    <ItemMenu
                        items={items}
                    />
                ),
                title: 'actions',
                removable: false,
                readonly: true,
                hiddenByColumnsButton: true,
                align: 'right',
                customSort: null,
                editable: 'never',
                cellStyle: {width: '40px'}
            }
        ]
        return _.concat(columns, actionColumn)
    }, [columns])
    */