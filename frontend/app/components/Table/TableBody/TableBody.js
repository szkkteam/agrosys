import React, { useRef, useMemo } from 'react'
import messages from './messages'
import { forwardRef } from 'react';

import MaterialTable from 'material-table';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { useTableContext } from '../hooks'
import { useHeightDifference } from 'utils/hooks'

import TableToolbar from '../TableToolbar'
import { ItemMenu } from 'components'

import './tablebody.scss'
import { object } from 'prop-types';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

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
    console.debug("bodyHeight: ", bodyHeight)

    const actions = [
        rowData => {
            return ({
                icon: (props) => <ItemMenu icon={MoreVertIcon} items={actionItems} data={rowData} {...props}/>,
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
        ...Object.assign(components, {
            Toolbar: props => (
                <TableToolbar ref={toolbarRef} {...props} myProps={1}/>
            ),
            //Actions: (props) => <ItemMenu items={items} />
        })
    }

    return (
        <MaterialTable
            columns={columns}
            icons={tableIcons}
            actions={actionItems? actions: null}
            options={defaultOptions}
            style={{
                //backgroundColor: "#E0E0E0",
                borderRadius: "initial",
                boxShadow: "initial",
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