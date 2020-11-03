import React from 'react'
import Helmet from 'react-helmet'
import messages from 'farmApp/farm/messages';
import { useIntl } from 'react-intl'

import { PageContent } from 'components'

export default ({

}) => {
    const intl = useIntl()

    return (
        <PageContent>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.farmCreateTitle)}
                </title>
            </Helmet>
            <h1>Create a new farm</h1>
        </PageContent>

    )
}