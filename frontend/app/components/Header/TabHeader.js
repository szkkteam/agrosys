import React, { useRef, useMemo, useContext } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { useRouteMatch, useLocation, Switch } from "react-router-dom";
import { ROUTES, ROUTE_MAP } from 'routes'

import Tabs from '../Tab/Tabs'
import TabLink from '../Tab/TabLink'

const StyledTabs = styled(props => <Tabs {...props} />)`
    padding: 10px 20px;
`

const TabHeader = ({
    items,
    match,
    ...props
}) => {
    const intl = useIntl()

    let value = null
    items.map(({ to, value: tabValue }) => {
        const route = ROUTE_MAP[to]
        const matched = useRouteMatch({ path: route?.path, ...route.props})
        if (matched) {
            value = tabValue
        }
    })

    return (
        <StyledTabs
            value={value}
            orientation="horizontal"
            {...props}
        >
            { items && items.map((tab, i) => 
                <TabLink key={i} {...tab} params={match.params} />    
            )}            
        </StyledTabs>
    )
}

TabHeader.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        to: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    })),    
    //history: PropTypes.object.isRequired,
    //match: PropTypes.object.isRequired,
}

export default TabHeader
