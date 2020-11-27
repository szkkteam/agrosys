import React from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'

import { WorkerTableLayout } from '..'

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

const WorkersTable = ({
    ...props
}) => {
    const intl = useIntl()

    const columns = [
        { title: 'Role', field: 'role'},
        { title: 'Name', field: 'name'},
        { title: 'E-mail', field: 'email'},
        { title: 'Phone', field: 'phone' },
        { title: 'Address', field: 'address'}
    ]

    return (
            <WorkerTableLayout
                columns={columns}
                data={data}
                detailPanel={[
                    {
                      tooltip: intl.formatMessage(messages.expandRowTooltip),
                      render: rowData => {
                        return (
                          <div
                            style={{
                              fontSize: 100,
                              textAlign: 'center',
                              color: 'white',
                              backgroundColor: '#43A047',
                            }}
                          >
                            {rowData.name}
                          </div>
                        )
                      },
                    },
                ]}
            />
    )
}

WorkersTable.propTypes = {

}

export default WorkersTable
