import React from 'react'
import PropTypes from 'prop-types'
import { useStore, ReactReduxContext } from 'react-redux'
import hoistNonReactStatics from 'hoist-non-react-statics'
import get from 'lodash/get'

import getInjectors from './reducerInjectors'


/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
export default (props) => (WrappedComponent) => {
  if (get(props, '__esModule', false)) {
    props = {
      key: props.KEY,
      reducer: props.default,
    }
  }
  
  class ReducerInjector extends React.Component {
    static WrappedComponent = WrappedComponent
    static contextType = ReactReduxContext
    static displayName = `withReducer(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`

    componentWillMount() {
      const { injectReducer } = this.injectors
      injectReducer(props.key, props.reducer)
    }

    injectors = getInjectors(this.context.store)

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return hoistNonReactStatics(ReducerInjector, WrappedComponent)
}

