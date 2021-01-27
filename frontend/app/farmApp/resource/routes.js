import React, { useEffect } from 'react'
import styled from 'styled-components'
import Content from 'components/Layout/Content'

import {
  WorkerList,
} from 'farmApp/resource/worker/pages'

import {
  FieldList,
  FieldCreateDraw,
  FieldEdit,
} from 'farmApp/resource/field/pages'

import {
  MachineryList
} from 'farmApp/resource/machinery/pages'

import {
  EntityList
} from 'farmApp/resource/entity/pages'

import {
    InventoryList
  } from 'farmApp/resource/inventory/pages'

import {
  ResourceHeaderTab
} from 'farmApp/resource/pages'

import { ProtectedRoute } from 'utils/route'

export const ROUTES = {
   
    /**
     * Resources Keys
     */
    Resource: 'Resource',
    // Field
    ResourceField: 'ResourceField',
    ResourceFieldList: 'ResourceFieldList',
    ResourceFieldEdit: 'ResourceFieldEdit',
    ResourceFieldCreateDraw: 'ResourceFieldCreateDraw',
    ResourceFieldCreateUpload: 'ResourceFieldCreateUpload',
  
    // Worker
    WorkerList: 'WorkerList',
  
    // Machinery
    MachineryList: 'MachineryList',
    // Entitiy
    EntityList: 'EntityList',
    /**
     * Productions keys
     */
    Production: 'Production',
  
  
  
    // Inventory
    InventoryList: 'InventoryList',  
}


const PlaceHolder = styled.div`
  display: none;
  & + div {
    height: 100%;
  }
`
const PlaceholderDiv = props => <PlaceHolder />

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

export const routes = [
  {
    key: ROUTES.Resource,
    path: '/resource',
    component: ResourceHeaderTab,
    routeComponent: ProtectedRoute,
    layoutComponent: Content,
    routes: [
      // Field routes
      {
        key: ROUTES.ResourceField,
        path: '/fields',
        component: PlaceholderDiv,
        routeComponent: ProtectedRoute,
        routes: [
          {
            key: ROUTES.ResourceFieldList,
            path: '',
            component: FieldList,
            routeComponent: ProtectedRoute,
            props: { exact: true }
          },
          {
            key: ROUTES.ResourceFieldEdit,
            path: '/:id/edit',
            component: FieldEdit,
            routeComponent: ProtectedRoute,
            props: { exact: true }
          },
          {
            key: ROUTES.ResourceFieldCreateDraw,
            path: '/new/draw',
            component: FieldCreateDraw,
            routeComponent: ProtectedRoute,
            props: { exact: true }
          },
          {
            key: ROUTES.ResourceFieldCreateUpload,
            path: '/new/upload',
            component: FieldList,
            routeComponent: ProtectedRoute,
            props: { exact: true }
          },          
        ]
        //props: { exact: true }
      },
      // Worker routes    
      {
        key: ROUTES.WorkerList,
        path: '/workers',
        component: WorkerList,
        routeComponent: ProtectedRoute,
        //props: { exact: true }
      },
      // Machinery routes  
      {
        key: ROUTES.MachineryList,
        path: '/machinery',
        component: MachineryList,
        routeComponent: ProtectedRoute,
        props: { exact: true }
      },
      // Entity routes  
      {
        key: ROUTES.EntityList,
        path: '/entities',
        component: EntityList,
        routeComponent: ProtectedRoute,
        props: { exact: true }
      },
    ]
  },
  // Inventory routes  
  {
    key: ROUTES.InventoryList,
    path: '/inventory',
    component: InventoryList,
    routeComponent: ProtectedRoute,
    props: { exact: false }
  },
]