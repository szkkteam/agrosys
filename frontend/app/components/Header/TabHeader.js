import React, { useRef, useMemo, useContext } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { useRouteMatch, useParams, Redirect } from "react-router-dom";
import { ROUTES, ROUTE_MAP } from 'routes'

import Tabs from '../Tab/Tabs'
import TabLink from '../Tab/TabLink'

const StyledTabs = styled(props => <Tabs {...props} />)`
    padding: 10px 20px;
`

const TabHeader = ({
    items,
    redirectTo=null,
    ...props
}) => {
    const intl = useIntl()
    const redirectRoute = ROUTE_MAP[redirectTo ?? items[0].to]

    let value = null
    items.map(({ to, value: tabValue }) => {
        const route = ROUTE_MAP[to]
        const matched = useRouteMatch({ path: route?.path, ...route.props})
        if (matched) {
            value = tabValue
        }
    })
    const isMatchFound = !_.isNull(value)

    const params = useParams()

    return (
        <>
        { !isMatchFound
            ? <Redirect to={redirectRoute.toPath()} />
            : <StyledTabs
                value={value}
                orientation="horizontal"
                {...props}
            >
                { items && items.map((tab, i) => 
                    <TabLink key={i} {...tab} params={params} />    
                )}            
            </StyledTabs>
        }
        </>
        
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
