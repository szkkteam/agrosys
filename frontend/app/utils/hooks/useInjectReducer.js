import React, { useLayoutEffect, useRef } from 'react'
import { useStore } from 'react-redux'
import get from 'lodash/get'

import getInjectors from 'utils/async/reducerInjectors'


/**
 * A react hook that dynamically injects a reducer when the hook is run
 *
 * @param {Object} params
 * @param {string} params.key The key to inject the reducer under
 * @param {function} params.reducer The reducer that will be injected
 *
 * @example
 *
 * function BooksManager() {
 *   useInjectReducer({ key: "books", reducer: booksReducer })
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
      reducer: props.default,
    }
  }
  const {key, reducer} = props

  const store = useStore()

  const isInjected = useRef(false)

  // TODO: https://github.com/react-boilerplate/redux-injectors/issues/19
  /*
  if (!isInjected.current) {
    isInjected.current = true
    setTimeout(() => {
      getInjectors(store).injectReducer(key, reducer)
    }, 0);
  }
  */
  // FIXME: This is a quick fix suggested by: https://github.com/react-boilerplate/redux-injectors/issues/19
  // It could have unwanted side effects

  useLayoutEffect(() => {
    if (!isInjected.current) {
        getInjectors(store).injectReducer(key, reducer)
        isInjected.current = true
      }
  }, [])
}
