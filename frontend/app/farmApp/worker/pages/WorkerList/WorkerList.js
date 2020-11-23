import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'

import { PageContent, HeaderContent, MasterDetail } from 'components'
import { WorkerLayout } from '../../components'

export default ({
    history,
    match,
    ...props
}) => {
    const intl = useIntl()

    return (
        <PageContent>
            <Helmet>
                <title>
                    {intl.formatMessage(messages.title)}
                </title>
            </Helmet>
            <HeaderContent
                header={
                    <div>Header</div>
                }
                content={ 
                    <WorkerLayout
                        history={history}
                        match={match}
                    />
                }
            />
        </PageContent>

    )
}