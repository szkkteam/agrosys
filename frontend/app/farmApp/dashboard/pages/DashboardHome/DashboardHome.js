import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'
import styled from 'styled-components'

import { PageContent } from 'components'

import { usePageTitle } from 'utils/hooks'

export default ({

}) => {
    const intl = useIntl()

    usePageTitle(messages.title)

    return (
        <div style={{height: "50%"}}>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.title)}
                </title>
            </Helmet>
            <h1>Dashboard home view</h1>
        </div>
    )
}