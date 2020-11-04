import React from 'react'
import PropTypes from 'prop-types'
import { useStore, ReactReduxContext } from 'react-redux';
import hoistNonReactStatics from 'hoist-non-react-statics'
import get from 'lodash/get'

import getInjectors from './sagaInjectors'


/**
 * Dynamically injects a saga, passes component's props as saga arguments
 *
 * @param {Object} props
 * @param {string} props.key A key of the saga
 * @param {function} props.sagas A fn returning sagas to be injected
 * @param {string} [props.mode] By default, constants.DAEMON
 *   - constants.RESTART_ON_REMOUNT - the saga will be started on component mount and cancelled with `task.cancel()` on component un-mount for improved performance.
 *   - constants.DAEMON — starts the saga on component mount and never cancels it or starts again.
 *   - constants.ONCE_TILL_UNMOUNT — behaves like 'RESTART_ON_REMOUNT' but never runs it again.
 *
 */
export default (props) => (WrappedComponent) => {
  if (get(props, '__esModule', false)) {
    props = {
      key: props.KEY,
      sagas: props.default,
      mode: get(props, 'MODE', null),
    }
  }

  class InjectSaga extends React.Component {
    static WrappedComponent = WrappedComponent
    static contextType = ReactReduxContext;

    static displayName = `withSaga(${(WrappedComponent.displayName || WrappedComponent.name || 'Component')})`

    componentWillMount() {
      const { injectSaga } = this.injectors

      // create a root saga to inject
      const saga = function *() {
        yield props.sagas()
      }

      injectSaga(props.key, { saga, mode: props.mode }, this.props)
    }

    componentWillUnmount() {
      const { ejectSaga } = this.injectors

      ejectSaga(props.key)
    }

    injectors = getInjectors(this.context.store)

    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  return hoistNonReactStatics(InjectSaga, WrappedComponent)
}

/**
 * A react hook that dynamically injects a saga when the hook is run
 *
 * @param {Object} params
 * @param {string} params.key The key to inject the saga under
 * @param {function} params.saga The saga that will be injected
 * @param {string} [params.mode] The injection behaviour to use. The default is
 * `SagaInjectionModes.DAEMON` which causes the saga to be started on component
 * instantiation and never canceled or started again. @see
 * {@link SagaInjectionModes} for the other possible modes.
 *
 * @example
 *
 * function BooksManager() {
 *   useInjectSaga({ key: "books", saga: booksSaga })
 *
 *   return null;
 * }
 *
 * @public
 */
const useInjectSaga = (props) => {
  if (get(props, '__esModule', false)) {
    props = {
      key: props.KEY,
      sagas: props.default,
      mode: get(props, 'MODE', null),
    }
  }
  const { key, saga, mode } = props

  const store = useStore();

  const isInjected = React.useRef(false);

  if (!isInjected.current) {
    getInjectors(store).injectSaga(key, { saga, mode });
    isInjected.current = true;
  }

  React.useEffect(
    () => () => {
      getInjectors(store).ejectSaga(key);
    },
    [],
  );
};

export { useInjectSaga };