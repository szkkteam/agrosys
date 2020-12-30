import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'

import { PageContent } from 'components'
import { FarmLayout, FarmHeader, FarmCreate } from '../../components'

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
            <FarmLayout
                header={
                    <FarmHeader
                        title={messages.headerTitle}
                    />
                }
            >
                <FarmCreate
                />
            </FarmLayout>
        </PageContent>

    )
}