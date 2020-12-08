import React from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'

import { 
    Table,
    TableHeader,
    TableBody
} from 'components/Table'

const data = [
    { title: 'Manager', isActive: true },
    { title: 'Admin', isActive: true },
    { title: 'Operator', isActive: true },
    { title: 'Old role', isActive: false },
]

const ReservationTable = ({
    siblingRef,
    ...props
}) => {
    const intl = useIntl()

    const columns = [
        { title: 'Name', field: 'title'},
        { title: 'Active', field: 'isActive', type: 'boolean'},
        //{ title: 'Address', field: 'address', hidden: true}
    ]

    return (
            <Table
                siblingRef={siblingRef}
                columns={columns}
            >
                <TableHeader 
                    title={messages.tableTitle}
                />
                <TableBody
                    data={data}
                    {...props}
                />
            </Table>
    )
}

ReservationTable.propTypes = {

}

export default ReservationTable
