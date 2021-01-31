import React, { useEffect } from 'react'
import styled from 'styled-components'
import Content from 'components/Layout/Content'
import { Redirect, generatePath } from 'react-router-dom'

import {
    SeasonOverview,
    SeasonEmpty,
    SeasonCreate,
  //MachineryOverview,
  //MachineryReservation
} from 'farmApp/cropProduction/season/pages'

import { Button } from '@material-ui/core'
import { withLinkComponent } from 'utils/hoc'
const Link = withLinkComponent(Button)

import { ProtectedRoute } from 'utils/route'

export const ROUTES = {

    CropProductionSeason: 'CropProductionSeason',
    CropProductionSeasonCreate: 'CropProductionSeasonCreate',

  
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
        // TODO: Season components
        key: "SpecificCropInCaseofNoSeason",
        path: '',
        component: SeasonEmpty,
        routes: [
          {
            // TODO: This will be used as a jump point (for specific crop check if has season, if yes redirect here)
            // TODO: Season components
            key: ROUTES.CropProductionSeason,
            path: '/seasons/:seasonId',
            component: SeasonOverview,
          }
        ]
      },
]

export const seasonCreate = [
    {
        key: ROUTES.CropProductionSeasonCreate,
        path: '/:cropId/season',
        component: SeasonCreate,
        // TODO: Include a table view, and the reservations view
        props: { exact: true }
    },
]

export const seasonDetail = [
    /*
    {
        key: ROUTES.MachineryDatabase,
        path: '/machinery',
        component: MachineryTable,
        // TODO: Include a table view, and the reservations view
        props: { exact: true }
    },
    {
        key: ROUTES.MachineryReservation,
        path: '/machinery/reservation',
        component: MachineryReservation,
        // TODO: Include a table view, and the reservations view
        //props: { exact: true }
    },
    */
]