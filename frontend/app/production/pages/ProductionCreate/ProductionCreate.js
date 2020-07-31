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
        <ProductionCreateContainer />
        <div>Create new production</div>
        <div>props: {JSON.stringify(props, null, 2)}</div>
    </PageContent>
)
