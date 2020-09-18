import React from 'react'
import Helmet from 'react-helmet'

import { PageContent } from 'components'
import { TemplateView } from 'pages/components'

export default (props) => {
    return (
        <PageContent>
            <Helmet>
            <title>
                Templates
            </title>
            </Helmet>
            <TemplateView />
        </PageContent>
    )
}
