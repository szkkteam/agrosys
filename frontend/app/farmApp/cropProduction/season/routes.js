import React, { useEffect } from 'react'
import styled from 'styled-components'
import Content from 'components/Layout/Content'
import { Redirect, generatePath } from 'react-router-dom'

import {
  taskOverview,
  ROUTES as taskRoutesKeys,
} from 'farmApp/cropProduction/task/routes'

import {
  fieldProductionOverview,
  ROUTES as fieldProductionRoutesKeys,
} from 'farmApp/cropProduction/fieldProduction/routes'

import {
    SeasonOverview,
    SeasonEmpty,
    SeasonCreate,
    SeasonList,
  //MachineryOverview,
  //MachineryReservation
} from 'farmApp/cropProduction/season/pages'

import { Button } from '@material-ui/core'
import { withLinkComponent } from 'utils/hoc'
const Link = withLinkComponent(Button)

import { ProtectedRoute } from 'utils/route'

export const ROUTES = {

    CropProductionCrop: 'CropProductionCrop',
    CropProductionSeason: 'CropProductionSeason',
    CropProductionSeasonCreate: 'CropProductionSeasonCreate',

    CropProductionSeasonViews: 'CropProductionSeasonViews',

    CropProductionSeasonView: 'CropProductionSeasonView',

    ...taskRoutesKeys,
    ...fieldProductionRoutesKeys,
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
export const seasonOverview = [
  {
    // TODO: This will be used as a jump point (for specific crop check if has season, if yes redirect here)
    // TODO: Season components
    key: ROUTES.CropProductionSeason,
    path: '/seasons/:seasonId',
    component: SeasonOverview,
  }
]


export const seasonDetail = [
  {
    key: ROUTES.CropProductionSeasonCreate,
    path: '/:cropId/seasons/new',
    component: SeasonCreate,
    // TODO: Include a table view, and the reservations view
    props: { exact: true }
  },
  {
    // This will be used a jump point (Navigate back from deeply nested views)
    key: ROUTES.CropProductionSeasonViews,
    path: '/:cropId/seasons/:seasonId/views',
    component: 'div',    
    routes: [
      {
        key: ROUTES.CropProductionSeasonView,
        path: '/seasons',
        component: SeasonList,
      },
      ...taskOverview,
      ...fieldProductionOverview,
    ]
  }
]