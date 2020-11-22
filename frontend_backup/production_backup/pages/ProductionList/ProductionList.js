import React from 'react'
import Helmet from 'react-helmet'

import { PageContent } from 'components'

import { ProductionListContainer } from 'production/components'

export default () => (
    <PageContent>
        <Helmet>
        <title>
            Production List
        </title>
        </Helmet>
        <ProductionListContainer />
    </PageContent>
)