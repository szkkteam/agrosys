import React, { useEffect } from 'react'
import styled from 'styled-components'
import Content from 'components/Layout/Content'

import {
    FieldOverview,
    FieldMap,
    FieldCreateDraw,
    FieldEdit
} from 'farmApp/resource/field/pages'

import { ProtectedRoute } from 'utils/route'

export const ROUTES = {
   
    // Machinery
    ResourceField: 'ResourceField',

    ResourceFieldMap: 'ResourceFieldMap',
    ResourceFieldEdit: 'ResourceFieldEdit',

    ResourceFieldCreateDraw: 'ResourceFieldCreateDraw',
    ResourceFieldCreateUpload: 'ResourceFieldCreateUpload',

    //ResourceField: 'MachineryDatabase',
    //MachineryReservation: 'MachineryReservation',

  
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
export const fieldOverview = [
    {
        key: ROUTES.ResourceField,
        path: '/resources/overview/fields',
        component: FieldOverview, 
        props: { absolute: true }
    },
]

/**
 * Responsive route design:
 * 1) /fields - This will show the fields as list items.
 * 2) /fields/map - This will show the fields as master and map as a "detail"
 * 
 * TODO: I need a header. In case of /fields
 */

export const fieldDetail = [
    
    {
        // Used for mobile screens
        key: ROUTES.ResourceFieldMap,
        path: '/fields/:id',
        component: FieldMap,
        props: { exact: true }
    },
    {
        // Used for mobile screens
        key: ROUTES.ResourceFieldEdit,
        path: '/fields/:id/edit',
        component: FieldEdit,
        props: { exact: true }
    },
    {
        // Used for mobile screens
        key: ROUTES.ResourceFieldCreateDraw,
        path: '/fields/new/draw',
        component: FieldCreateDraw,
        props: { exact: true }
    },  
    {
        // Used for mobile screens
        key: ROUTES.ResourceFieldCreateUpload,
        path: '/fields/new/upload',
        component: FieldMap,
        props: { exact: true }
    },  
    /*
    {
        key: ROUTES.MachineryReservation,
        path: '/machinery/reservation',
        component: MachineryReservation,
        // TODO: Include a table view, and the reservations view
        //props: { exact: true }
    },
    */
]