import React, { useEffect, useMemo } from 'react'
import { Route } from 'react-router-dom'
import startCase from 'lodash/startCase'
import { compile } from 'path-to-regexp'

export const compileRoutes = (routeMap, routes, parentPath="") => {
    routes.forEach((route) => {
      let { component = null, key, label, path: relPath, routeComponent, props = {} } = route
      /*
      if (!component) {
        throw new Error(`component was not specified for the ${key} route!`)
      }
      */
      /*
      if (!relPath) {
        throw new Error(`path was not specified for the ${key} route!`)
      }
      */
      
      const { absolute = false } = props
      const path = absolute? relPath : parentPath + relPath

      if (route.routes?.length) {
        compileRoutes(routeMap, route.routes, path)
      }
  
      try {
        routeMap[key] = {
          path,
          relPath,
          toPath: compile(path),
          component,
          routeComponent: routeComponent || Route,
          label: label || startCase(key),
          props,
        }
      } catch (e) {
        console.debug("Error: ", e)
      }
      
    })
  }
