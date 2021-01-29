import React, { useEffect, useMemo } from 'react'
import { Route, Switch, Redirect, matchPath } from 'react-router-dom'

const RecursiveRouter = ({
    routes,
    parentMatch="",
    routeMap,
}) => {
  return (
      <Switch>
        {routes.map(({key, routes: children, layoutComponent: Layout = React.Fragment}) => {
          const { component: Component, path, relPath, props: rest, routeComponent: RouteComponent } = routeMap[key]
          return (
            <RouteComponent 
              //path={`${parentMatch}${relPath}`}
              path={path}
              //key={path}
              key="1"
              component={props => {  
                  const { match } = props
                  return (
                    <Layout>
                      <Component {...props} /> 
                      {children && children.length > 0 ?
                        <RecursiveRouter {...props} routes={children} parentMatch={match.url} routeMap={routeMap} />
                      : null}
                    </Layout>
                )  
                }}
              {...rest}
            />
          )
        })}
      </Switch>
  )
}

export default RecursiveRouter
