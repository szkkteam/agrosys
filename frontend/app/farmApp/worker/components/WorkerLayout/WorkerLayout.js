import React, { useLayoutEffect, useMemo, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { FormattedMessage } from 'react-intl'

import {
    WorkerRoleTab,
    WorkerTable,
    RoleTable,
} from '../../components'

import {
    TAB_WORKERS,
    TAB_ROLES
} from '../../constants'

import './workerlayout.scss'

const WorkerLayout = ({
    
}) => {

    const [value, setValue] = useState(TAB_WORKERS)

    return (
        <div>
            <WorkerRoleTab
                value={value}
                valueLeft={TAB_WORKERS}
                valueRight={TAB_ROLES}
                onChange={setValue}
            />
            { value === TAB_WORKERS?
                <WorkerTable />
              : <RoleTable />
            }
        </div>
    )
}

WorkerLayout.propTypes = {

}

export default WorkerLayout