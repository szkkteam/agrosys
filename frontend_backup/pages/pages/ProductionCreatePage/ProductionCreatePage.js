import React from 'react'
import Helmet from 'react-helmet'

import { PageContent } from 'components'
import { ProductionCreateView } from 'pages/components'

export default (props) => {
    return (
        <PageContent>
            <Helmet>
            <title>
                Production - Create
            </title>
            </Helmet>
            <ProductionCreateView />
        </PageContent>
    )
}
