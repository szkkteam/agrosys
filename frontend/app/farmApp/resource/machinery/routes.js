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

    TESTA: 'TEST1',
    TESTB: 'TEST2',
  
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
        // TODO: Include a table view, and the reservations view
        //props: { exact: true }
        routes: [
            {
                key: ROUTES.TESTA,
                path: '/test1',
                component: 'div',
            },
            {
                key: ROUTES.TESTB,
                path: '/test2',
                component: 'div',
            }
        ]
    },
]

export const machineryDetail = [
    {
        key: 'MachineryDetailAppbar',
        path: '/machinery',
        component: MachineryTableAppBar,
        // TODO: Include a table view, and the reservations view
        //props: { exact: true }
        routes: [
            {
                key: ROUTES.MachineryDatabase,
                path: '/list',
                component: MachineryTable,
                // TODO: Include a table view, and the reservations view
                //props: { exact: true }
            },
        ]
    },
    
]