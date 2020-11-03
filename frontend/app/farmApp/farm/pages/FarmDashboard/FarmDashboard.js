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
                    {intl.formatMessage(messages.farmDashboardTitle)}
                </title>
            </Helmet>
            <h1>Farm dashboard</h1>
        </PageContent>

    )
}