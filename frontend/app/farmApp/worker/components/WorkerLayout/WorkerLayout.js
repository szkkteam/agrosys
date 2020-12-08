import React, { useContext, useMemo, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

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

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`

const WorkerLayout = ({
    
}) => {

    const [value, setValue] = useState(TAB_WORKERS)
    const tabsRef = useRef(null)

    const {
        headerPortalRef,
    } = useContext(HeaderContentContext)

    const tabValues = [
        {value: TAB_WORKERS, message: messages.left},
        {value: TAB_ROLES, message: messages.right},
    ]

    return (
        <Container>
            <Portal container={headerPortalRef.current}>
                <div>Worker specific context</div>
            </Portal>
            <TabsButton
                ref={tabsRef}
                defaultValue={value}
                values={tabValues}
                onChange={setValue}
            />
            { value === TAB_WORKERS?
                <WorkerTable
                    siblingRef={tabsRef}
                />
              : <RoleTable 
                    siblingRef={tabsRef}
                />
            }
        </Container>
    )
}

WorkerLayout.propTypes = {

}

export default WorkerLayout