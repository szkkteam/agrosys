import React from 'react'
import Helmet from 'react-helmet'
import messages from './messages';
import { useIntl } from 'react-intl'

import { ProductionLayout } from '../../components'
import { PageContent } from 'components'


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
            <ProductionLayout
                history={history}
                match={match}
            />            
        </PageContent>
    )
}
