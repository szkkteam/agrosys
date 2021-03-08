import React, { useRef, useMemo } from 'react'
import messages from './messages'
import { forwardRef } from 'react';
import styled from 'styled-components'
import sizeMe, { SizeMe } from 'react-sizeme'

import MoreVertIcon from '@material-ui/icons/MoreVert';

import TableToolbar from './TableToolbar'
import TableAction from './TableAction'
import { ItemMenu } from 'components'

import TableBase from './TableBase'

import { object } from 'prop-types';

const CenteredItemMenu = styled(props => <ItemMenu {...props} />)`
    margin: 0 auto;
`

const Container = (props) => {
    return (
        <SizeMe monitorHeight noPlaceholder>
            {({ size }) => 
                <MuiTable
                    size={size}
                    {...props}
                />
            }
        </SizeMe>
    )
}

class MuiTable extends React.Component {

    constructor(props) {
        super(props);
        this.toolbarRef = React.createRef();
      }

    renderToolbar = (props) => {
        const {
            filterProps
        } = this.props

        return (
            <TableToolbar {...props} filterProps={filterProps}/>
        )
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
                emptyRowsWhenPaging: false,
                //toolbar: false, // By default remove toolbar
                //paging: false, // By default remove paging
                //maxBodyHeight: bodyHeight, // By default set height
                //minBodyHeight: bodyHeight - 1, // By default set height
                headerStyle: { 
                    //position: 'sticky',
                    //top: 0,
                    //backgroundColor: "#E0E0E0",
                    //borderBottom: "2px solid",
                    //boxShadow: "inset 0 -2px 0 black",
                }, // By default sticky header
                columnsButton: true,
                actionsColumnIndex: -1,
            })
        } 

        const defaultComponents = {
            ...{
                // This has to be given as class method, otherwise the toolbar remounts and the filter & search are not working properly                
                Toolbar: this.renderToolbar,
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
                    flexGrow: 1,
                }}            
                components={defaultComponents}
                {...props}
            />
        )
    }
}

export default Container