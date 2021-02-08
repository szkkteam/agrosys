import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import isFunction from 'lodash/isFunction'

export default class LoadableNavLink extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    to: PropTypes.string,
    params: PropTypes.object,
    routeMap: PropTypes.object,
  }

  constructor(props) {
    super(props)
    const { routeMap } = props
    this.route = routeMap[props.to]
  }

  componentWillReceiveProps(nextProps) {
    const { routeMap } = this.props
    this.route = routeMap[nextProps.to]
  }

  maybePreloadComponent = () => {
    if (!this.route) {
      return
    }

    const { component } = this.route
    if (isFunction(component.preload)) {
      component.preload()
    }
  }

  render() {
    const { children, routeMap, to, params, dataProps = null, ...props } = this.props    
    return (
      <NavLink {...props}
               activeClassName="active"
               onMouseOver={this.maybePreloadComponent}
               to={this.route ? { pathname: this.route.toPath(params), ...dataProps} : to}
      >
        {children || this.route.label}
      </NavLink>
    )
  }
}
