import React, { useLayoutEffect, useMemo, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { TabsButton } from 'components'
import { useHeightDifference } from 'utils/hooks'

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
    
    const containerRef = useRef(null)
    const tabsRef = useRef(null)

    const height = useHeightDifference(containerRef, tabsRef, 778)
    
    const tabValues = [
        {value: TAB_MACHINERIES, message: messages.left},
        {value: TAB_RESERVATIONS, message: messages.right},
    ]

    return (
        <Container
            ref={containerRef}
        >
            <TabsButton
                ref={tabsRef}
                defaultValue={value}
                values={tabValues}
                onChange={setValue}
            />
            { value === TAB_MACHINERIES?
                <MachineryTable
                    height={height}
                />
              : <ReservationTable
                    height={height}
                />
            }
        </Container>
    )
}

MachineryLayout.propTypes = {

}

export default MachineryLayout