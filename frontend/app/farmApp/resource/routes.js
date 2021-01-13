import React, { useEffect } from 'react'
import Content from 'components/Layout/Content'

import {
  BlockList,
  BlockDetail,
  BlockCreateDraw,
  BlockCreateUpload,
  BlockCreateLPIS
} from 'farmApp/resource/block/pages'

import {
  WorkerList,
} from 'farmApp/resource/worker/pages'

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
} from 'farmApp/resource/resource/pages'

import { ProtectedRoute } from 'utils/route'

export const ROUTES = {
   
    /**
     * Resources Keys
     */
    Resource: 'Resource',
  
    // Block
    BlockList: 'BlockList',
    BlockDetail: 'BlockDetail',
    BlockCreateDraw: 'BlockCreateDraw',
    BlockCreateUpload: 'BlockCreateUpload',
    BlockCreateLPIS: 'BlockCreateLPIS',
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
      {
        key: ROUTES.BlockCreateDraw,
        path: '/resource/fields/new/draw',
        component: BlockCreateDraw,
        routeComponent: ProtectedRoute,
        props: { exact: true }
      },
      {    
        key: ROUTES.BlockCreateUpload, // This must come before BlockList
        path: '/resource/fields/new/upload',
        component: BlockCreateUpload,
        routeComponent: ProtectedRoute,
        props: { exact: true }
      },
      {    
        key: ROUTES.BlockCreateLPIS, // This must come before BlockList
        path: '/resource/fields/new/lpis',
        component: BlockCreateLPIS,
        routeComponent: ProtectedRoute,
        props: { exact: true }
      },
      {    
        key: ROUTES.BlockDetail, // This must come before BlockList
        path: '/resource/fields/:id/detail',
        component: BlockDetail,
        routeComponent: ProtectedRoute,
        props: { exact: true }
      },      
      {        
        key: ROUTES.BlockList, //Block list must be in the end of the list, because it's accepting multiple routes (exact=false)
        path: '/resource/fields',
        component: BlockList,
        routeComponent: ProtectedRoute,
      },
      // Worker routes    
      {
        key: ROUTES.WorkerList,
        path: '/resource/workers',
        component: WorkerList,
        routeComponent: ProtectedRoute,
        //props: { exact: true }
      },
      // Machinery routes  
      {
        key: ROUTES.MachineryList,
        path: '/resource/machinery',
        component: MachineryList,
        routeComponent: ProtectedRoute,
        props: { exact: true }
      },
      // Entity routes  
      {
        key: ROUTES.EntityList,
        path: '/resource/entities',
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