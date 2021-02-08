import React, { useContext, useMemo, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import messages from './messages';
import { FormattedMessage, useIntl } from 'react-intl'
import styled from 'styled-components'

import { Redirect, useLocation } from "react-router-dom";
import { HashRoute } from 'utils/route'

import { 
    HeaderContent,
    HeaderContentContext,
    Tabs,
    TabLink
} from 'components'

import { useHeightDifference } from 'utils/hooks'

import {
    MachineryTable,
    ReservationTable,
} from '..'

import {
    TAB_MACHINERIES,
    TAB_RESERVATIONS
} from '../../constants'

const StyledTabs = styled(props => <Tabs {...props} />)`
    padding: 10px 20px;
`

const TableRoutes = ({
    
}) => {

    const {
        contentHeight,
    } = useContext(HeaderContentContext)

    return (
        <>
            <HashRoute path={TAB_MACHINERIES} component={props => <MachineryTable height={contentHeight} {...props} />} />
            <HashRoute path={TAB_RESERVATIONS} component={props => <ReservationTable height={contentHeight} {...props} />} />
            <HashRoute path="" component={({location}) => <Redirect to={{...location, hash: TAB_MACHINERIES}} />} />
        </>
    )
}


const MachineryLayout = ({
    
}) => {
    const intl = useIntl()
    const location = useLocation()

    const tabValues = [
        {value: TAB_MACHINERIES, title: intl.formatMessage(messages.left)},
        {value: TAB_RESERVATIONS, title: intl.formatMessage(messages.right)},
    ]

    return (
        <HeaderContent
            //ref={containerRef}
        >
            <StyledTabs
                value={location.hash || TAB_MACHINERIES}
                orientation="horizontal"
            >
                { tabValues && tabValues.map((tab, i) => (
                    <TabLink key={i} to={ {...location, hash: tab.value} } value={tab.value} label={tab.title} />  
                ))}                
            </StyledTabs>
            <TableRoutes
            />
        </HeaderContent>
    )
}

/*

*/

MachineryLayout.propTypes = {

}

export default MachineryLayout