import React, { useRef, useMemo, useContext } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { useRouteMatch, useParams, Redirect } from "react-router-dom";
import { ROUTES, ROUTE_MAP } from 'farmApp/routes'

import Tabs from './Tabs'
import TabLink from './TabLink'


const TabsRoute = ({
    items,
    redirectTo=null,
    redirect=true,
    params={},
    routeMap=ROUTE_MAP,
    ...props
}) => {
    const redirectRoute = routeMap[redirectTo ?? items[0].to]

    let value = null
    let matchParams = params
    items.map(({ to }, i) => {
        const route = ROUTE_MAP[to]
        //console.debug("Route: ", route)
        const matched = useRouteMatch({ path: route?.path, ...route.props})
        console.debug("Matched: ", matched)
        if (matched) {
            matchParams = {
                ...matched.params,
                ...matchParams
            }
            value = i
        }
    })
    const isMatchFound = !_.isNull(value)

    const urlParams = useParams()
    console.debug("Route-params: ", urlParams)
    const { path, url } = useRouteMatch()

    console.debug(path) // /topics/:topicId/:subId
    console.debug(url) // /topics/react-router/url-parameters

    return (
        <>
        { !isMatchFound
            ? redirect ? <Redirect to={redirectRoute.toPath(params)} /> : null
            : <Tabs
                orientation="horizontal"
                {...props}
                value={value}
            >
                { items && items.map(({params=urlParams, ...tab}, i) => 
                    <TabLink key={i} {...tab} value={i} params={{...matchParams, ...params}} />    
                )}            
            </Tabs>
        }
        </>
        
    )
}


TabsRoute.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        to: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    })),    
    redirect: PropTypes.bool,
    params: PropTypes.object,
    //history: PropTypes.object.isRequired,
    //match: PropTypes.object.isRequired,
}

export default TabsRoute
