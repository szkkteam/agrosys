import React, { useLayoutEffect, useMemo, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { TabsButton } from 'components'

import {
    MachineryTable,
    ReservationTable,
} from '..'

import {
    TAB_MACHINERIES,
    TAB_RESERVATIONS
} from '../../constants'

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`

const MachineryLayout = ({
    
}) => {

    const [value, setValue] = useState(TAB_MACHINERIES)
    const tabsRef = useRef(null)

    const tabValues = [
        {value: TAB_MACHINERIES, message: messages.left},
        {value: TAB_RESERVATIONS, message: messages.right},
    ]

    return (
        <Container>
            <TabsButton
                ref={tabsRef}
                defaultValue={value}
                values={tabValues}
                onChange={setValue}
            />
            { value === TAB_MACHINERIES?
                <MachineryTable
                    siblingRef={tabsRef}
                />
              : <ReservationTable
                    siblingRef={tabsRef}
                />
            }
        </Container>
    )
}

MachineryLayout.propTypes = {

}

export default MachineryLayout