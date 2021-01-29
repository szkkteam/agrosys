import React, { useEffect } from 'react'
import styled from 'styled-components'
import Content from 'components/Layout/Content'

import { MachineryTableAppBar } from 'farmApp/resource/machinery/components'

import {
  MachineryTable,
  MachineryOverview
} from 'farmApp/resource/machinery/pages'

import { ProtectedRoute } from 'utils/route'

export const ROUTES = {
   
    // Machinery
    ResourceMachinery: 'ResourceMachinery',

    MachineryDatabase: 'MachineryDatabase',
  
}

/**
 * route details
 *
 * list of objects with keys:
 *  - key: component class name
 *  - path: the path for the component (in react router notation)
 *  - component: The component to use
 *  - routeComponent: optional, AnonymousRoute, ProtectedRoute or Route (default: Route)
 *  - label: optional, label to use for links (default: startCase(key))
 */

 /**
  * Route prefix: /resource
  */
export const machineryOverview = [
    {
        key: ROUTES.ResourceMachinery,
        path: '/machinery',
        component: MachineryOverview,
        routeComponent: ProtectedRoute,
        // TODO: Include a table view, and the reservations view
        //props: { exact: true }
    },
]

export const machineryDetail = [
    {
        key: 'MachineryDetailAppbar',
        path: '/machinery',
        component: MachineryTableAppBar,
        routeComponent: ProtectedRoute,
        // TODO: Include a table view, and the reservations view
        //props: { exact: true }
        routes: [
            {
                key: ROUTES.MachineryDatabase,
                path: '/list',
                component: MachineryTable,
                routeComponent: ProtectedRoute,
                // TODO: Include a table view, and the reservations view
                //props: { exact: true }
            },
        ]
    },
    
]