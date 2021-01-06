import React, { useState, useRef, useLayoutEffect } from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { PrimaryActionButton } from 'components'
import { MACHINERY_DIALOG } from 'site/modalTypes'
import { usePushModalWindow } from 'utils/hooks'

import {
    Grid
} from '@material-ui/core'

import { 
    Table,
    TableHeader,
    TableBody
} from 'components/Table'
import { 
    SideSheet,
} from 'components'

import { SideDetail } from 'farmApp/components/SideDetail'

import { useHeightDifference } from 'utils/hooks'

const FlexGrid = styled(Grid)`
    display: flex;
`

const Spacer = styled.div`
    flex-grow: 1;
`

const data = [
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },

    { name: 'John Doe', role: 'Worker', email: 'johndoe@user.com', phone: '+36-11/111111', address: '9999 Random city, random street 2' },
    /*
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
    */
]

const Tab1 = props => <div>Tab 1</div>
const Tab2 = props => <div>Tab 2</div>

import { TaskCalendar } from 'farmApp/production/task/components'
const Reservation = (props) => {
    return (
        <TaskCalendar />
    )
}

const MachineryTable = ({
    height: parentHeight,
    siblingRef,
    ...props
}) => {
    const intl = useIntl()
    
    const headerRef = useRef(null)
    const [selectedData, setSelectedData] = useState(null)

    const handleClose = () => {
        setSelectedData(null)
    }

    const handleOpen = (e, rowData) => {
        setSelectedData(rowData)
    }

    const height = useHeightDifference(parentHeight, headerRef, 542)
    
    const columns = [
        { title: 'Role', field: 'role', hiddenByColumnsButton: true},
        { title: 'Name', field: 'name'},
        { title: 'E-mail', field: 'email'},
        { title: 'Phone', field: 'phone' },
        { title: 'Address', field: 'address', hidden: true}
    ]


    const push = usePushModalWindow()

    const openEdit = (e, data) => {
        push(MACHINERY_DIALOG, {data}).then((status) => {
            console.debug("Finished: ", status)
        })
    }

    const handleAddNew = (e) => {
        push(MACHINERY_DIALOG, {}).then((status) => {
            console.debug("Finished: ", status)
        })
    }

    const items = [
        {title: messages.edit, onClick: openEdit},
        {title: messages.delete, onClick: null}
    ]
    
    const tabs = [
        {title: messages.edit, component: Tab1},
        {title: messages.delete, component: Reservation},
    ]
    
    return (
            <Table
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
                                onClick={handleAddNew}
                            />
                        </FlexGrid>
                        <Grid item xs={3}>                            
                        </Grid>
                    </Grid>
                </TableHeader>
                <SideSheet
                    open={!!selectedData}
                >
                    <TableBody
                        height={height}
                        columns={columns}
                        data={data}
                        actionItems={items}
                        onRowClick={handleOpen}
                        {...props}
                    />
                    <SideDetail
                        title={selectedData?.name}
                        tabs={tabs}
                        data={selectedData}
                        buttons={items}
                        onClose={handleClose}
                    >
                        <div>Content</div>
                    </SideDetail>
                </SideSheet>

            </Table>
    )
}

MachineryTable.propTypes = {

}

export default MachineryTable
