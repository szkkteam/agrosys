import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { push } from 'connected-react-router'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { enqueueNotification } from 'site/actions'
import { ROUTES, ROUTE_MAP } from 'farmApp/routes'

class UnconnectedAnonymousRoute extends React.Component {
  componentDidMount() {
    const { isAuthenticated, push, enqueueNotification } = this.props
    if (isAuthenticated) {
      push(ROUTE_MAP[ROUTES.DashboardOverview].path)
      enqueueNotification({
        message: 'You are already logged in.',
        options: {
            key: new Date().getTime() + Math.random(),
            variant: 'info',
        },
      })
    }
  }

  render() {
    const {
      component: Component,
      isAuthenticated,
      push,
      flashInfo,
      ...routeProps
    } = this.props

    return <Route {...routeProps} render={(props) => <Component {...props} />} />
  }
}

export default connect(
  (state) => ({ isAuthenticated: state.security.isAuthenticated }),
  (dispatch) => bindActionCreators({ enqueueNotification, push }, dispatch),
)(UnconnectedAnonymousRoute)
