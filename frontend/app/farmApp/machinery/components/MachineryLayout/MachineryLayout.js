import React, { useLayoutEffect, useMemo, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { FormattedMessage } from 'react-intl'

import { TabsButton } from 'components'

import {
    MachineryTable,
    ReservationTable,
} from '..'

import {
    TAB_MACHINERIES,
    TAB_RESERVATIONS
} from '../../constants'

import './machinerylayout.scss'

const MachineryLayout = ({
    
}) => {

    const [value, setValue] = useState(TAB_MACHINERIES)

    const tabValues = [
        {value: TAB_MACHINERIES, message: messages.left},
        {value: TAB_RESERVATIONS, message: messages.right},
    ]

    return (
        <div>
            <TabsButton
                defaultValue={value}
                values={tabValues}
                onChange={setValue}
            />
            { value === TAB_MACHINERIES?
                <MachineryTable />
              : <ReservationTable />
            }
        </div>
    )
}

MachineryLayout.propTypes = {

}

export default MachineryLayout