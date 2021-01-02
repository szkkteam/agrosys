import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { usePageTitle } from 'utils/hooks'

import { ReportHeader } from '../../components'

export default ({
    ...props
}) => {

    usePageTitle(messages.title)

    return (
        <ReportHeader {...props}/>
    )
}