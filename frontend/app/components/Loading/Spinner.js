import React from 'react'
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress'

import './spinner.scss'

export const Spinner = (props) => {
  const { color } = props
  return (
    <CircularProgress
      color={color}
    />
  )
}

Spinner.defaultProps = {
  color: 'primary',
}

Spinner.propTypes = {
  color: PropTypes.string,
}

export default Spinner
