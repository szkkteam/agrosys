import React from 'react'
import Helmet from 'react-helmet'

import { PageContent } from 'components'

import { ProductionCreateContainer } from 'production/components'

export default (props) => (
    <PageContent>
        <Helmet>
        <title>
            New Production Template
        </title>
        </Helmet>
        <ProductionCreateContainer
            routerParams={props.location}
        />
    </PageContent>
)
