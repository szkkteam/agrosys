import React, { useEffect, useMemo } from 'react'
import { Route } from 'react-router-dom'
import startCase from 'lodash/startCase'
import { compile } from 'path-to-regexp'

export const compileRoutes = (routeMap, routes, parentPath="") => {
    routes.forEach((route) => {
      let { component, key, label, path: relPath, routeComponent, props } = route
    
      if (!component) {
        throw new Error(`component was not specified for the ${key} route!`)
      }
      /*
      if (!relPath) {
        throw new Error(`path was not specified for the ${key} route!`)
      }
      */
      
  
      const path = parentPath + relPath
      
      if (route.routes?.length) {
        compileRoutes(routeMap, route.routes, path)
      }
  
      
      routeMap[key] = {
        path,
        relPath,
        toPath: compile(path),
        component,
        routeComponent: routeComponent || Route,
        label: label || startCase(key),
        props,
      }
    })
  }
