import React, { useEffect } from "react"
import { useLocation, useRouteMatch, useHistory } from "react-router-dom"


export default (routes, defaultRoute, replaceIfNoMatch=false) => {
    let location = useLocation()
    let history = useHistory()
    //console.log("Location: ", location)
    //const routes = dynamicRoutes.map(route => `${location.pathname}` + route.startsWith("/")? route : '/' + route)
    //console.log("Routes: ", routes)
    const match = useRouteMatch(routes)
    //console.log("Match: ", match)

    useEffect(() => {
        if (replaceIfNoMatch && !match) {
            history.replace({
                pathname: defaultRoute,
                search: location.search
            })
        }        
    }, [match])

    return match?.path ?? defaultRoute

  }