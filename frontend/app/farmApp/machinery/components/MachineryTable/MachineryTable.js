import React from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'

import { Table } from 'components/Table'

const data = [
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
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
    { name: 'Person name', role: 'Manager', email: 'user1@user.com', phone: '+36-30/333333', address: '9999 Random city, random street 2' },
]

const MachineryTable = ({
    ...props
}) => {
    const intl = useIntl()

    const columns = [
        { title: 'Role', field: 'role'},
        { title: 'Name', field: 'name'},
        { title: 'E-mail', field: 'email'},
        { title: 'Phone', field: 'phone' },
        { title: 'Address', field: 'address', hidden: true}
    ]

    return (
            <Table
                tableTitle={messages.tableTitle}
                columns={columns}
                data={data}
                {...props}
            />
    )
}

MachineryTable.propTypes = {

}

export default MachineryTable
