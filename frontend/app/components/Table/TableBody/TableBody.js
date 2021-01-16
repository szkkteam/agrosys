import React, { useRef, useMemo } from 'react'
import messages from './messages'
import { forwardRef } from 'react';
import styled from 'styled-components'
import sizeMe, { SizeMe } from 'react-sizeme'


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
import TableAction from './TableAction'
import { ItemMenu } from 'components'

import TableBase from '../TableBase'

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

const CenteredItemMenu = styled(props => <ItemMenu {...props} />)`
    margin: 0 auto;
`

const Container = (props) => {
    return (
        <SizeMe monitorHeight noPlaceholder>
            {({ size }) => 
                <TableBody
                    size={size}
                    {...props}
                />
            }
        </SizeMe>
    )
}

class TableBody extends React.Component {

    constructor(props) {
        super(props);
        this.toolbarRef = React.createRef();
      }

    render() {
        const {
            columns,
            size: { height = 700 },
            options={},
            actionItems,
            components={},
            ...props

        } = this.props

        const bodyHeight = (height) - (this.toolbarRef?.clientHeight ?? 0)

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
                //minBodyHeight: bodyHeight - 1, // By default set height
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
                    <TableToolbar  innerRef={el => this.toolbarRef = el} {...props} myProps={1}/>
                ),
                Action: TableAction,
                //Actions: (props) => <ItemMenu items={items} />
            }, ...components
        }

        return (
            <MaterialTable
                icons={tableIcons}    
                columns={columns}
                actions={actionItems? actions: null}
                options={defaultOptions}
                style={{
                    //backgroundColor: "#E0E0E0",
                    borderRadius: "initial",
                    boxShadow: "initial",
                    width: "100%",
                    flexGrow: 1,
                }}            
                components={defaultComponents}
                {...props}
            />
        )
    }
}
/*
const TableBody = ({
    columns,
    size: { height },
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

    console.debug("height: ", height)

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

TableBody.propTypes = {

}
*/
//const SizedTableBody = sizeMe({monitorHeight: true, noPlaceholder: true})(TableBody)

export default Container