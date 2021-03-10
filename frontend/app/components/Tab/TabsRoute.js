import React, { useRef, useMemo, useContext } from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'
import styled from 'styled-components'
import { useRouteMatch, useParams, Redirect } from "react-router-dom";
import { ROUTES, ROUTE_MAP } from 'farmApp/routes'

import {
    Tabs,
} from '@material-ui/core';

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

}

export default TabsRoute
