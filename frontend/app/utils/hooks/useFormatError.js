import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'

export default (error) => {
  const intl = useIntl()

  return (typeof(error) === 'object' && error !== null)
    ? intl.formatMessage(error)
    : error  
}
