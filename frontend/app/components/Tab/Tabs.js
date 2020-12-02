import React from 'react'
import PropTypes from 'prop-types'
import { useDynamicMatch } from 'utils/hooks'

import { Tabs as MuiTabs } from '@material-ui/core';


const Tabs = ({
    id="vertical-tab",
    routes,
    defaultRoute,
    forceDefaultRoute=false,
    children,
    ...props
}) => {

    const tabValue = useDynamicMatch(routes, defaultRoute, forceDefaultRoute)

    const tabProps = (index) => {
        return {
            id: `${id}-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        }
    }

    return (
        <MuiTabs
            value={tabValue}
            {...props}
        >
            { React.Children.map(children, (
                (child, i) => React.cloneElement(child, tabProps(i))                    
            ))}
        </MuiTabs>
    )
}

Tabs.propTypes = {
    id: PropTypes.string,
    routes: PropTypes.arrayOf(PropTypes.string),
    defaultRoute: PropTypes.string.isRequired,
    forceDefaultRoute: PropTypes.bool,
    children: PropTypes.arrayOf(PropTypes.element)
}

export default Tabs