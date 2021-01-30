import React, { useEffect } from 'react'
import styled from 'styled-components'
import Content from 'components/Layout/Content'
import { Redirect } from 'react-router-dom'

import { ResourceAppBar } from 'farmApp/resource/components'

import {
  machineryOverview,
  machineryDetail,
  ROUTES as machineryRoutesKeys,
} from 'farmApp/resource/machinery/routes'

import {
  workerOverview,
  workerDetail,
  ROUTES as workerRoutesKeys,
} from 'farmApp/resource/worker/routes'


import {
  fieldOverview,
  fieldDetail,
  ROUTES as fieldRoutesKeys,
} from 'farmApp/resource/field/routes'



import {
  FieldList,
  FieldCreateDraw,
  FieldEdit,
} from 'farmApp/resource/field/pages'

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
    /*
    // Field
    ResourceField: 'ResourceField',
    ResourceFieldList: 'ResourceFieldList',
    ResourceFieldEdit: 'ResourceFieldEdit',
    ResourceFieldCreateDraw: 'ResourceFieldCreateDraw',
    ResourceFieldCreateUpload: 'ResourceFieldCreateUpload',
    */
  
    // Entitiy
    EntityList: 'EntityList',
    /**
     * Productions keys
     */
    Production: 'Production',
  
  
  
    // Inventory
    InventoryList: 'InventoryList',  

    ...machineryRoutesKeys,
    ...workerRoutesKeys,
    ...fieldRoutesKeys,
}


const PlaceHolder = styled.div`
  display: none;
  & + div {
    height: 100%;
  }
`
const PlaceholderDiv = props => {

  return <PlaceHolder key="123456"/>
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


const RedirectToOverview = (props) => {
  return <Redirect from="/resources" to="/resources/overview" />
}

export const routes = [
  {
    key: ROUTES.Resource,
    path: '/resources',
    component: 'div',
    //component: PlaceholderDiv,
    //layoutComponent: Content,
    routes: [
      {
        key: 'RedirectToOVerview',
        path: '',
        component: RedirectToOverview,
        props: { exact: true }
      },
      {
        key: 'ResourceAppBar',
        path: '/overview',
        component: ResourceAppBar,
        routes: [
          
              
          // Entity routes  
          {
            key: ROUTES.EntityList,
            path: '/entities',
            component: EntityList,
            routeComponent: ProtectedRoute,
            props: { exact: true }
          },

          ...machineryOverview,
          ...workerOverview,
          ...fieldOverview,
        ]
      },
      ...machineryDetail,
      ...workerDetail,
      ...fieldDetail,
    ]
  },
  // Inventory routes  
  {
    key: ROUTES.InventoryList,
    path: '/inventory',
    component: InventoryList,
    props: { exact: false }
  },

]

/*
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
*/