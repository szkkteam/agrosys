import React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'

export default (title) => ({
message: <FormattedMessage {...messages.userCropCreated} values={{b: chunks => <b>{title}</b>}}/>,
      options: {
          key: new Date().getTime() + Math.random(),
          variant: 'info',
      },
})