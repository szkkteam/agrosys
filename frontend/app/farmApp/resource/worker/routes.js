import React, { useEffect } from 'react'
import styled from 'styled-components'
import Content from 'components/Layout/Content'

import {
    WorkerList,
    WorkerOverview,
    WorkerTable,
    WorkerRole,
} from 'farmApp/resource/worker/pages'
  

import { ProtectedRoute } from 'utils/route'

export const ROUTES = {
   
    // Worker
    ResourceWorker: 'ResourceWorker',

    WorkerDatabase: 'WorkerDatabase',
    WorkerRole: 'WorkerRole',
  
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
export const workerOverview = [
    {
        key: ROUTES.ResourceWorker,
        path: '/worker',
        component: WorkerOverview,
        // TODO: Include a table view, and the reservations view
        //props: { absolute: true }
    },
]

export const workerDetail = [
    {
        key: ROUTES.WorkerDatabase,
        path: '/worker',
        component: WorkerTable,
        // TODO: Include a table view, and the reservations view
        props: { exact: true }
    },
    {
        key: ROUTES.WorkerRole,
        path: '/worker/role',
        component: WorkerRole,
        props: { exact: true }
    }
    
]
