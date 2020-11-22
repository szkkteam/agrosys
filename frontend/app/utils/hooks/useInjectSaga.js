import React from 'react'
import { useStore } from 'react-redux'
import get from 'lodash/get'

import getInjectors from 'utils/async/sagaInjectors'

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
export default (props) => {
    if (get(props, '__esModule', false)) {
        props = {
            key: props.KEY,
            sagas: props.default,
            mode: get(props, 'MODE', null),
        }
    }
    const {key, sagas, mode} = props

    const store = useStore();

    const isInjected = React.useRef(false);
  
    if (!isInjected.current) {
      // create a root saga to inject
      const saga = function *() {
        yield sagas()
      }

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