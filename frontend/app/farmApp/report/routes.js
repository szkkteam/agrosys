import React, { useEffect } from 'react'
import Content from 'components/Layout/Content'
import HeaderContent from 'components/Layout/HeaderContent'

/**
 * Reports
 */

import {
  ReportDashboard,
  ReportHeader
} from 'farmApp/report/report/pages'

import {
  CountrySummary,
  CountryGn,
} from 'farmApp/report/country/pages'

import {
  ResourceBlock,
  ResourceMachinery,
  ResourceWorker,
  ResourceUsage,
  ResourceInventory
} from 'farmApp/report/resource/pages'

import CountryTabHeader from 'farmApp/report/country/components/CountryTabHeader'
import ResourceTabHeader from 'farmApp/report/resource/components/ResourceTabHeader'

import { ProtectedRoute } from 'utils/route'

/**
 * ROUTES: The canonical store of frontend routes. Routes throughout the system
 * should be referenced using these constants
 *
 * Both keys and values are component class names
 */
export const ROUTES = {
  /**
   * Report keys
   */
  Report: 'Report',
  ReportDashboard: 'ReportDashboard',
  // Report - Country
  ReportCountry: 'Country',
  ReportCountrySummary: 'CountrySummary',
  ReportCountryGn: 'CountryGn',
  // Report - Resource
  ReportResource: 'ReportResource',
  ReportResourceBlock: 'ReportResourceBlock',
  ReportResourceMachinery: 'ReportResourceMachinery',
  ReportResourceWorker: 'ReportResourceWorker',
  ReportResourceUsage: 'ReportResourceUsage',
  ReportResourceInventory: 'ReportResourceInventory',

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
  // Report routes  
  {
    key: ROUTES.Report,
    path: '/reports',
    component: ReportHeader,
    routeComponent: ProtectedRoute,
    layoutComponent: Content,
    routes: [
      // Crops overall view (Timeline). Show all crops , productions and seasons
      {
        key: ROUTES.ReportCountry,
        path: '/reports/country',
        component: CountryTabHeader,
        routeComponent: ProtectedRoute,
        layoutComponent: HeaderContent,
        //props: { exact: true },
        routes: [
          // TODO: Maybe remove this? I think we don't need a summary here
          {
            key: ROUTES.ReportCountrySummary,
            path: '/reports/country',
            component: CountrySummary,
            routeComponent: ProtectedRoute,
            props: { exact: true },
          },
          {
            key: ROUTES.ReportCountryGn,
            path: '/reports/country/gazdasagi-naplo',
            component: CountryGn,
            routeComponent: ProtectedRoute,
            props: { exact: true },
          },
        ]
      },
      {
        key: ROUTES.ReportResource,
        path: '/reports/resource',
        component: ResourceTabHeader,
        routeComponent: ProtectedRoute,
        layoutComponent: HeaderContent,
        //props: { exact: true },
        routes: [          
          {
            key: ROUTES.ReportResourceUsage,
            path: '/reports/resource/usage',
            component: ResourceUsage,
            routeComponent: ProtectedRoute,
            props: { exact: true },
          },
          {
            key: ROUTES.ReportResourceBlock,
            path: '/reports/resource/fields',
            component: ResourceBlock,
            routeComponent: ProtectedRoute,
            props: { exact: true },
          },
          {
            key: ROUTES.ReportResourceMachinery,
            path: '/reports/resource/machinery',
            component: ResourceMachinery,
            routeComponent: ProtectedRoute,
            props: { exact: true },
          },
          {
            key: ROUTES.ReportResourceWorker,
            path: '/reports/resource/worker',
            component: ResourceWorker,
            routeComponent: ProtectedRoute,
            props: { exact: true },
          },
          {
            key: ROUTES.ReportResourceInventory,
            path: '/reports/resource/inventory',
            component: ResourceInventory,
            routeComponent: ProtectedRoute,
            props: { exact: true },
          },
          
        ]
      },
    ]
  },
 
]
