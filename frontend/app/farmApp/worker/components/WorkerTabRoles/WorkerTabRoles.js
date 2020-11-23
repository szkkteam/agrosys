import React from 'react'
import messages from './messages';
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl';

import { WorkerTableLayout } from '../../components'

const data = [
    { name: 'Manager', numOfPeople: 1, active: true },
    { name: 'Worker', numOfPeople: 11, active: true },
    { name: 'Seasonal Worker', numOfPeople: 21, active: false },
    { name: 'Administrator', numOfPeople: 2, active: true },

]

const WorkerTabRoles = ({
    ...props
}) => {
    const columns = [
        { title: 'Role Name', field: 'name'},
        { title: 'Active members', field: 'numOfPeople'},
        { title: 'Active', field: 'active' },
    ]

    return (
            <WorkerTableLayout
                columns={columns}
                data={data}
            />
    )
}

WorkerTabRoles.propTypes = {

}

export default WorkerTabRoles
