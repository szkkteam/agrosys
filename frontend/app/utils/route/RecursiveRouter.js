import React, { useEffect, useMemo } from 'react'
import { Route, Switch, Redirect, matchPath } from 'react-router-dom'

class DefaultLayout extends React.PureComponent {

  componentWillUnmount() {
    console.debug("Layout will unmount: ", this.props.parentMatch)
  }

  render() {
    const { children } = this.props
    //console.debug("Layout children: ", children)
    return (
      <>
      {children}
      </>
      )
  }
}

const RecursiveRouter = ({
    routes,
    parentMatch="",
    routeMap,
}) => {
  /*
  useEffect(() => {
    console.debug("RecursiveRouter - mount: ", parentMatch)
    return () => {
      console.debug("RecursiveRouter - unmount: ", parentMatch)
    }
  }, [])
  */

  return (
      <Switch>
        {routes.map(({key, routes: children, layoutComponent: Layout = React.Fragment}) => {
          const { component: Component, path, relPath, props: rest, routeComponent: RouteComponent } = routeMap[key]
          //console.debug("Path: ", path, children)
          return (
            <RouteComponent 
              //path={`${parentMatch}${relPath}`}
              path={path}
              key={path}
              //key="1"
              //key={key}
              render={props => {  
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
