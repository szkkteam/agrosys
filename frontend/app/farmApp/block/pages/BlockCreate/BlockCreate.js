import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'
import { PageContent, HeaderContent } from 'components'

// 1) Load the map drawing screen


export default ({
    ...rest  
}) => {
    const intl = useIntl()
    return (
        <PageContent>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.title)}
                </title>
            </Helmet>
            <div>
                Create new fields
            </div>
        </PageContent>
    )
}