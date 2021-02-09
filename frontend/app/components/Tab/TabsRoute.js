import React, { useRef, useMemo, useContext } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { useRouteMatch, useParams, Redirect } from "react-router-dom";
import { ROUTES, ROUTE_MAP } from 'farmApp/routes'

import Tabs from './Tabs'
import TabLink from './TabLink'


const TabsRoute = ({
    valueAccessor,
    items,
    redirectTo=null,
    redirect=true,
    //params={},
    routeMap=ROUTE_MAP,
    ...props
}) => {
    const redirectToRoute = routeMap[redirectTo?.to ?? items[0].to]
    const redirectParams = !redirectTo? items[0].value : redirectTo.params

    /*

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
    */
   const { params } = useRouteMatch()
   const value = params[valueAccessor]
   console.debug("Params: ", params)
   const isMatchFound = !!value

    return (
        <>
        { !isMatchFound
            ? redirect ? <Redirect to={redirectToRoute.toPath(redirectParams)} /> : null
            : <Tabs
                orientation="horizontal"
                {...props}
                value={value}
            >
                { items && items.map(({value, ...tab}, i) => 
                    <TabLink key={i} {...tab} value={value[valueAccessor]} params={{...params, ...value}} routeMap={routeMap}/>    
                )}            
            </Tabs>
        }
        </>
        
    )
}


TabsRoute.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        to: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired,
        label: PropTypes.string.isRequired
    })),    
    redirect: PropTypes.bool,
    valueAccessor: PropTypes.string.isRequired,
    redirectTo: PropTypes.shape({
        to: PropTypes.string.isRequired,
        params: PropTypes.object,
    })

    //params: PropTypes.object,
    //history: PropTypes.object.isRequired,
    //match: PropTypes.object.isRequired,
}

export default TabsRoute
