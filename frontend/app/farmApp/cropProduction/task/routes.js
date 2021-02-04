import React, { useEffect } from 'react'
import styled from 'styled-components'
import Content from 'components/Layout/Content'
import { Redirect, generatePath } from 'react-router-dom'

import {
    TaskOverview,
} from 'farmApp/cropProduction/task/pages'

import { Button } from '@material-ui/core'
import { withLinkComponent } from 'utils/hoc'
const Link = withLinkComponent(Button)

import { ProtectedRoute } from 'utils/route'

export const ROUTES = {

  CropProductionTaskView: 'CropProductionTaskView',
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
export const taskOverview = [
    {
        // TODO: Season components
        key: ROUTES.CropProductionTaskView,
        path: '/tasks',
        component: TaskOverview,
        
      },
]
/*
export const seasonCreate = [
    {
        key: ROUTES.CropProductionSeasonCreate,
        path: '/:cropId/seasons/new',
        component: SeasonCreate,
        // TODO: Include a table view, and the reservations view
        props: { exact: true }
    },
]

export const seasonDetail = [
  {
    // This will be used a jump point (Navigate back from deeply nested views)
    key: ROUTES.CropProductionSeasonViews,
    path: '/:cropId/season/:seasonId/views/:tab?',
    component: 'div',    
    
  },
   
]
*/