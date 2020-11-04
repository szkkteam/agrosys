import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'

import { PageContent } from 'components'

import { LeafletMap } from 'farmApp/map/components'

export default ({

}) => {
    const intl = useIntl()

    return (
        <PageContent>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.title)}
                </title>
            </Helmet>
            <h1>Farm dashboard</h1>
                <LeafletMap
                    height='400px'
                />
        </PageContent>

    )
}