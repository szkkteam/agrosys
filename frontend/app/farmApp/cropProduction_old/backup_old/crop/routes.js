import React, { useEffect } from 'react'
import styled from 'styled-components'
import Content from 'components/Layout/Content'
import { Redirect, generatePath } from 'react-router-dom'

import {
    CropOverview,
} from 'farmApp/cropProduction/crop/pages'

export const ROUTES = {

    CropProductionCrop: 'CropProductionCrop',

    //...seasonRoutesKeys,
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
export const cropOverview = [
    {
        // TODO: Season components
        key: ROUTES.CropProductionCrop,
        path: '',
        component: CropOverview,
        props: { exact: true }
        /*
        routes: [
          ...seasonOverview,
          
        ]
        */
      },
]

export const cropDetail = [
    //...seasonDetail  
]