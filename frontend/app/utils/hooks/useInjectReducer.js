import React from 'react'
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

  const isInjected = React.useRef(false)

  if (!isInjected.current) {
    getInjectors(store).injectReducer(key, reducer)
    isInjected.current = true
  }
}
