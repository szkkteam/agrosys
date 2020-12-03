import React, { useContext, useMemo, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { FormattedMessage } from 'react-intl'

import Portal from '@material-ui/core/Portal';
import { HeaderContentContext, TabsButton } from 'components'

import {
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

    const {
        headerPortalRef,
    } = useContext(HeaderContentContext)

    const tabValues = [
        {value: TAB_WORKERS, message: messages.left},
        {value: TAB_ROLES, message: messages.right},
    ]

    return (
        <div>
            <Portal container={headerPortalRef.current}>
                <div>Worker specific context</div>
            </Portal>
            <TabsButton
                defaultValue={value}
                values={tabValues}
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