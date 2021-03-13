import React, { useRef, useMemo, useLayoutEffect, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { ROUTES, ROUTE_MAP } from 'farmApp/routes'

export default ({season, goUpRoute = {to: ROUTES.OperationViews}, redirect = {to: ROUTES.OperationViews}}) => {
    const history = useHistory()
    const route = ROUTE_MAP[ROUTES.OperationTaskCreate].toPath({season})

    return (taskType) => {
        history.push({
            pathname: route,
            state: {
                taskType,
                goUpRoute,
                redirect,
            }
        })
    }
}
