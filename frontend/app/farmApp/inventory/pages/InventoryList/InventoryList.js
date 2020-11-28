import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'

import { PageContent } from 'components'
import { InventoryLayout } from '../../components'

export default ({
    match,
    location
}) => {
    const intl = useIntl()

    return (
        <PageContent>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.title)}
                </title>
            </Helmet>
            <InventoryLayout 
                match={match}
            />
        </PageContent>

    )
}